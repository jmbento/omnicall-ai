/**
 * OmniCall AI - Utility Functions
 * Helper functions for styling and common operations
 */

type ClassValue = string | boolean | null | undefined | ClassValue[];

/**
 * Combines class names conditionally, filtering out falsy values.
 * A lightweight alternative to clsx/classnames.
 * 
 * @example
 * cn('base-class', isActive && 'active', error && 'error-state')
 * // Returns: "base-class active" (if both conditions are true)
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ');
}

/**
 * Formats a number as currency (BRL by default)
 */
export function formatCurrency(
  value: number,
  locale = 'pt-BR',
  currency = 'BRL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formats a date relative to now (e.g., "2 hours ago", "yesterday")
 */
export function formatRelativeTime(date: Date, locale = 'pt-BR'): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays > 0) return rtf.format(-diffDays, 'day');
  if (diffHours > 0) return rtf.format(-diffHours, 'hour');
  if (diffMinutes > 0) return rtf.format(-diffMinutes, 'minute');
  return rtf.format(-diffSeconds, 'second');
}

/**
 * Delays execution for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates a unique ID for React keys and other purposes
 */
export function generateId(prefix = 'omni'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Truncates text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Debounce function for rate-limiting
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}
