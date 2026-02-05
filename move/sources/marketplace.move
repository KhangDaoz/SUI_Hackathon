#[allow(duplicate_alias, lint(public_entry))]
module green_marketplace::marketplace {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use std::string::{Self, String};

    const EInsufficientPayment: u64 = 0;
    const ENotSeller: u64 = 1;

    public struct Product has key, store {
        id: UID,
        title: String,
        description: String,
        price: u64,
        seller: address,
        green_credits: u64,
        is_listed: bool,
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
    }

    public struct ProductSold has copy, drop {
        product_id: ID,
        seller: address,
        buyer: address,
        price: u64,
        green_credits_earned: u64,
    }

    public entry fun list_product(
        title: vector<u8>,
        description: vector<u8>,
        price: u64,
        green_credits: u64,
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
        };

        event::emit(ProductListed {
            product_id: object::id(&product),
            seller,
            price,
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

        let credits = GreenCredit {
            id: object::new(ctx),
            amount: product.green_credits,
            owner: buyer,
        };
        transfer::transfer(credits, buyer);

        let seller_credits = GreenCredit {
            id: object::new(ctx),
            amount: product.green_credits / 2,
            owner: product.seller,
        };
        transfer::transfer(seller_credits, product.seller);

        event::emit(ProductSold {
            product_id: object::uid_to_inner(&product.id),
            seller: product.seller,
            buyer,
            price: product.price,
            green_credits_earned: product.green_credits,
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
}
