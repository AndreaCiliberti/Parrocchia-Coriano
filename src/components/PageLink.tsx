import React from 'react';
import { PageId } from '../types';
import { pathFor } from '../routes';

interface PageLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  page: PageId;
  onNavigate: (page: PageId) => void;
}

/**
 * A real link to a page (crawlable, opens in a new tab with ctrl/cmd-click)
 * that navigates inside the app on a plain click.
 */
export const PageLink: React.FC<PageLinkProps> = ({ page, onNavigate, ...rest }) => (
  <a
    {...rest}
    href={pathFor(page)}
    onClick={(e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      onNavigate(page);
    }}
  />
);
