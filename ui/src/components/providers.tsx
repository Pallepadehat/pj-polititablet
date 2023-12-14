"use client";

import store from "@/state/store";

import { Provider } from "react-redux";
import EventListener from "./eventListener";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <EventListener>{children}</EventListener>
    </Provider>
  );
}
