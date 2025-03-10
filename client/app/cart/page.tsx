'use client';

import CartItems from '@/src/components/cart-items';
import DeliveryOptions from '@/src/components/delivery-options';
import CustomerDetails from '@/src/components/customer-details';
import SummaryBox from '@/src/components/summary-box';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import styles from '@/src/styles/cart.module.css';
import {useEffect, useState} from "react";
import {CartResponseDto} from "@/src/api/models/response/cart";
import {deleteFromCart, getCart, updateCart} from "@/src/api/service/cartService";
import {toast, Toaster} from "react-hot-toast";
import {getMyUser} from "@/src/api/service/userService";

export interface DeliveryInfo {
    dateReceivingInMS: number;
    timeReceivingInMS: number;
    type: 'DELIVERY' | 'SELF_CALL';
    nameCustomer: string;
    phoneCustomer: string;
    nameRecipient: string;
    phoneRecipient: string;
    comment: string;
}

export default function CartPage() {
    const [cart, setCart] = useState<CartResponseDto[] | undefined>(undefined);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        type: 'DELIVERY',
        nameCustomer: '',
        phoneCustomer: '',
        nameRecipient: '',
        phoneRecipient: '',
        comment: '',
        dateReceivingInMS: 0,
        timeReceivingInMS: 0
    });

    useEffect(() => {
        getCart()
            .then(r => setCart(r))
            .catch(err => toast.error(err.message));

        getMyUser()
            .then(r => {
                setDeliveryInfo(prev => ({
                    ...prev,
                    phoneCustomer: r.phoneNumber,
                    nameCustomer: (r.lastName || '') + ' ' + (r.firstName || '') + ' ' + (r.patronymic || '')
                }))
            })
    }, []);

    const handleDeleteElement = (id: number, productUrlName: string) => {
        deleteFromCart(id, productUrlName)
            .then(() => {
                if (cart) {
                    const filtered = cart.filter(item => item.id !== id);
                    setCart(filtered);
                }
            })
            .catch(err => toast.error(err.message));
    }

    const handleIncreaseCount = (item: CartResponseDto) => {
        updateCart(item.id, item.product.urlName,
            {
                count: item.count + 1,
                selected: item.selected
            })
            .then(() => {
                if (cart) {
                    const changed = cart.map(e => {
                        if (e.id === item.id) {
                            return {...e, count: e.count + 1};
                        } else {
                            return e;
                        }
                    })
                    setCart(changed);
                }
            })
            .catch(err => toast.error(err.message));
    }

    const handleDecreaseCount = (item: CartResponseDto) => {
        if (item.count === 1) {
            return
        }

        updateCart(item.id, item.product.urlName,
            {
                count: item.count - 1,
                selected: item.selected
            })
            .then(() => {
                if (cart) {
                    const changed = cart.map(e => {
                        if (e.id === item.id) {
                            return {...e, count: e.count - 1};
                        } else {
                            return e;
                        }
                    })
                    setCart(changed);
                }
            })
            .catch(err => toast.error(err.message));
    }

    const handleChangeSelected = (item: CartResponseDto) => {
        updateCart(item.id, item.product.urlName,
            {
                count: item.count,
                selected: !item.selected
            })
            .then(() => {
                if (cart) {
                    const changed = cart.map(e => {
                        if (e.id === item.id) {
                            return {...e, selected: !e.selected};
                        } else {
                            return e;
                        }
                    })
                    setCart(changed);
                }
            })
            .catch(err => toast.error(err.message));
    }

    return (
        <div className={styles.home}>
            <Toaster/>
            <Header logo="/assets/placeholder/logo.svg"/>
            <h1 className={styles.title}>Корзина</h1>
            <div className={styles.homeContainer}>
                {/* Левая часть - товары и данные */}
                <div className={styles.homeLeftContainer}>
                    <CartItems cart={cart} handleDeleteAction={handleDeleteElement}
                               handleIncreaseCountAction={handleIncreaseCount}
                               handleDecreaseCountAction={handleDecreaseCount}
                               handleChangeSelectedAction={handleChangeSelected}/>
                    <DeliveryOptions deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo}/>
                    <CustomerDetails deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo}/>
                </div>

                {/* Правая часть - итоговое окно */}
                <div>
                    <SummaryBox cart={cart} deliveryInfo={deliveryInfo}/>
                </div>
            </div>
            <Footer
                logo="/assets/placeholder/logo.svg"
                vk_link="/#"
                tg_link="/#"
            />
        </div>
    );
}
