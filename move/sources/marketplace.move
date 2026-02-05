#[allow(duplicate_alias, lint(public_entry))]
module green_marketplace::marketplace {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use std::string::{Self, String};

    const EInsufficientPayment: u64 = 0;
    const ENotSeller: u64 = 1;

    // Product Tags - Bonus Green Credits
    const TAG_NONE: u8 = 0;           // Không có tag: +0%
    const TAG_RECYCLED: u8 = 1;       // Sản phẩm tái chế: +50% credits
    const TAG_GREEN: u8 = 2;          // Sản phẩm xanh: +30% credits
    const TAG_RECYCLED_GREEN: u8 = 3; // Tái chế + Xanh: +100% credits

    public struct Product has key, store {
        id: UID,
        title: String,
        description: String,
        price: u64,
        seller: address,
        green_credits: u64,
        is_listed: bool,
        tag: u8,  // 0: none, 1: recycled, 2: green, 3: both
    }

    public struct GreenCredit has key, store {
        id: UID,
        amount: u64,
        owner: address,
    }

    public struct ProductListed has copy, drop {
        product_id: ID,
        seller: address,
        price: u64,
        tag: u8,
    }

    public struct ProductSold has copy, drop {
        product_id: ID,
        seller: address,
        buyer: address,
        price: u64,
        green_credits_earned: u64,
        tag: u8,
    }

    // Tính green credits - CHỈ sản phẩm xanh/tái chế mới được credits
    fun calculate_credits(base_credits: u64, tag: u8): u64 {
        if (tag == TAG_RECYCLED_GREEN) {
            base_credits * 2 // Tái chế + Xanh: x2
        } else if (tag == TAG_RECYCLED) {
            base_credits * 15 / 10 // Tái chế: x1.5
        } else if (tag == TAG_GREEN) {
            base_credits * 13 / 10 // Xanh: x1.3
        } else {
            0 // Không có tag = KHÔNG được credits
        }
    }

    public entry fun list_product(
        title: vector<u8>,
        description: vector<u8>,
        price: u64,
        green_credits: u64,
        tag: u8, // 0: none, 1: recycled, 2: green, 3: both
        ctx: &mut TxContext
    ) {
        let seller = tx_context::sender(ctx);
        
        let product = Product {
            id: object::new(ctx),
            title: string::utf8(title),
            description: string::utf8(description),
            price,
            seller,
            green_credits,
            is_listed: true,
            tag,
        };

        event::emit(ProductListed {
            product_id: object::id(&product),
            seller,
            price,
            tag,
        });

        transfer::share_object(product);
    }

    public entry fun buy_product(
        product: &mut Product,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        
        assert!(product.is_listed, ENotSeller);
        
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= product.price, EInsufficientPayment);

        transfer::public_transfer(payment, product.seller);

        // Chỉ sản phẩm xanh/tái chế mới được green credits
        let total_credits = calculate_credits(product.green_credits, product.tag);

        // Chỉ tạo credits nếu > 0
        if (total_credits > 0) {
            // Người mua nhận credits
            let credits = GreenCredit {
                id: object::new(ctx),
                amount: total_credits,
                owner: buyer,
            };
            transfer::transfer(credits, buyer);

            // Người bán nhận 50%
            let seller_credits = GreenCredit {
                id: object::new(ctx),
                amount: total_credits / 2,
                owner: product.seller,
            };
            transfer::transfer(seller_credits, product.seller);
        };

        event::emit(ProductSold {
            product_id: object::uid_to_inner(&product.id),
            seller: product.seller,
            buyer,
            price: product.price,
            green_credits_earned: total_credits,
            tag: product.tag,
        });

        product.is_listed = false;
    }

    public entry fun unlist_product(
        product: &mut Product,
        ctx: &mut TxContext
    ) {
        assert!(product.seller == tx_context::sender(ctx), ENotSeller);
        product.is_listed = false;
    }

    public fun get_price(product: &Product): u64 {
        product.price
    }

    public fun get_seller(product: &Product): address {
        product.seller
    }

    public fun is_listed(product: &Product): bool {
        product.is_listed
    }

    public fun get_green_credits(product: &Product): u64 {
        product.green_credits
    }

    public fun get_tag(product: &Product): u8 {
        product.tag
    }
}

