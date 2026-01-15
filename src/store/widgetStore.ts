
import { create } from 'zustand';

export type WidgetType = 'hotel' | 'bank' | 'retail' | null;

interface WidgetStore {
  activeWidget: WidgetType;
  widgetData: any;
  setWidget: (type: WidgetType, data: any) => void;
  clearWidget: () => void;
}

export const useWidgetStore = create<WidgetStore>((set) => ({
  activeWidget: null,
  widgetData: null,
  setWidget: (type, data) => set({ activeWidget: type, widgetData: data }),
  clearWidget: () => set({ activeWidget: null, widgetData: null }),
}));
