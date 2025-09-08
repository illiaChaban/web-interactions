import { s } from "~/utils/styles";

/**
 * Other useful properties best provided globally
 * scroll-behavior: smooth;
 * scroll-padding-block: 16px */
export const Page = s.div`fixed overflow-auto inset-0 contain-strict`;

export const Content = s.div`p-4 max-w-3xl mx-auto`;
