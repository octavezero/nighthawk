import * as React from 'react';

declare module 'react' {
    // Context via RenderProps
    interface ProviderProps<T> {
        value: T;
        children?: ReactNode;
    }

    interface ConsumerProps<T> {
        children: (value: T) => ReactNode;
        unstable_observedBits?: number;
    }

    type Provider<T> = ComponentType<ProviderProps<T>>;
    type Consumer<T> = ComponentType<ConsumerProps<T>>;
    interface Context<T> {
        Provider: Provider<T>;
        Consumer: Consumer<T>;
    }
    function createContext<T>(
        defaultValue: T,
        calculateChangedBits?: (prev: T, next: T) => number
    ): Context<T>;
    function createContext<T>(): Context<T | undefined>;
}
