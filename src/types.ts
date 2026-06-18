/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  localName?: string;
  price: string;
  category: 'drinks' | 'pastries' | 'sandwiches';
  description: string;
  ingredients: string[];
  signature?: boolean;
  isLocal?: boolean;
}

export interface Reservation {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
