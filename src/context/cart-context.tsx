
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { courses as allCourses } from '@/lib/courses-data';
import { useToast } from '@/hooks/use-toast';

export type CartItem = {
    courseId: string;
    segmentIds: Set<string>; // 'full' indicates the entire course
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (courseId: string, segmentId?: string, isFullCourse?: boolean) => void;
  addBundleToCart: (bundle: { courseId: string; segmentIds: string[] }[]) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  addMultipleToCart: (items: { courseId: string, segmentIds: string[] }[]) => void;
  loading: boolean;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  addBundleToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  addMultipleToCart: () => {},
  loading: true,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const syncCart = (data: any) => {
      const cartData = data?.cartItems || [];
      const newCart = cartData.map((item: any) => ({
        courseId: item.courseId,
        segmentIds: new Set(item.segmentIds || []),
      }));
      setCart(newCart);
    };

    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        syncCart(docSnap.data());
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      const localCart = localStorage.getItem('guestCart');
      syncCart(localCart ? JSON.parse(localCart) : { cartItems: [] });
      setLoading(false);
    }
  }, [user]);

  const updateCartInStorage = async (newCart: CartItem[]) => {
    const serializableCart = newCart.map(item => ({
        courseId: item.courseId,
        segmentIds: Array.from(item.segmentIds),
    }));

    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { cartItems: serializableCart }, { merge: true });
    } else {
      localStorage.setItem('guestCart', JSON.stringify({ cartItems: serializableCart }));
    }
    setCart(newCart);
  };

  const addToCart = (courseId: string, segmentId?: string, isFullCourse = false) => {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;

    let newCart = [...cart];
    const existingCartItemIndex = newCart.findIndex(item => item.courseId === courseId);

    if (existingCartItemIndex > -1) {
      // Course is already in the cart, update its segments
      const existingItem = newCart[existingCartItemIndex];
      const updatedSegments = new Set(existingItem.segmentIds);
      
      if (isFullCourse || updatedSegments.has('full')) {
         updatedSegments.add('full');
      } else if (segmentId) {
        if (updatedSegments.has(segmentId)) {
          toast({ variant: "destructive", title: "Already in Cart", description: `This topic is already in your cart.` });
          return;
        }
        updatedSegments.add(segmentId);
      } else { // Default to full course if no segment specified
        updatedSegments.add('full');
      }
      
      newCart[existingCartItemIndex] = { ...existingItem, segmentIds: updatedSegments };

    } else {
      // Course is not in the cart, add it
      const segmentIds = new Set<string>();
      if (isFullCourse) {
        segmentIds.add('full');
      } else if (segmentId) {
        segmentIds.add(segmentId);
      } else { // Default to full course
        segmentIds.add('full');
      }
      newCart.push({ courseId, segmentIds });
    }
    updateCartInStorage(newCart);
    toast({ title: "Added to Cart!", description: `${course.title} has been added to your cart.` });
  };
  
  const addMultipleToCart = (items: { courseId: string; segmentIds: string[] }[]) => {
      let newCart = [...cart];
      let itemsAdded = false;

      items.forEach(itemToAdd => {
          const course = allCourses.find(c => c.id === itemToAdd.courseId);
          if (!course) return;

          const existingCartItemIndex = newCart.findIndex(item => item.courseId === itemToAdd.courseId);

          if (existingCartItemIndex > -1) {
              const existingItem = newCart[existingCartItemIndex];
              const updatedSegments = new Set(existingItem.segmentIds);
              itemToAdd.segmentIds.forEach(segId => updatedSegments.add(segId));
              newCart[existingCartItemIndex] = { ...existingItem, segmentIds: updatedSegments };
          } else {
              newCart.push({ courseId: itemToAdd.courseId, segmentIds: new Set(itemToAdd.segmentIds) });
          }
          itemsAdded = true;
      });
      
      if(itemsAdded) {
          updateCartInStorage(newCart);
      }
  }


  const addBundleToCart = (bundle: { courseId: string; segmentIds: string[] }[]) => {
    let newCart = [...cart];
    let itemsAdded = false;

    bundle.forEach(bundleItem => {
        const existingCartItemIndex = newCart.findIndex(item => item.courseId === bundleItem.courseId);
        if (existingCartItemIndex > -1) {
            // Merge segments
            const existingItem = newCart[existingCartItemIndex];
            const updatedSegments = new Set(existingItem.segmentIds);
            bundleItem.segmentIds.forEach(segId => updatedSegments.add(segId));
            newCart[existingCartItemIndex] = { ...existingItem, segmentIds: updatedSegments };
        } else {
            // Add new course
            newCart.push({ courseId: bundleItem.courseId, segmentIds: new Set(bundleItem.segmentIds) });
        }
        itemsAdded = true;
    });

    if(itemsAdded) {
        updateCartInStorage(newCart);
        toast({ title: "Bundle Added!", description: "Your personalized bundle has been added to your cart." });
    }
  };

  const removeFromCart = (courseId: string) => {
    const newCart = cart.filter(item => item.courseId !== courseId);
    updateCartInStorage(newCart);
  };

  const clearCart = () => {
    updateCartInStorage([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, addBundleToCart, removeFromCart, clearCart, addMultipleToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
