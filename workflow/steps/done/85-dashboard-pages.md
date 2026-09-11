# Create the dashboard pages

**Status:** done

## What to do

Create the three dashboard pages (Site access, Most-accessed products, Article reads) with a period selector, consuming the metrics endpoints and using the design-system tokens/components. Mobile-first and no horizontal overflow. Follow the `dataviz` guidance if charts are used and keep copy in PT-BR.

## Done criteria

The three pages render the data from the endpoints on mobile and desktop.

## Original line

> Criar as páginas de dashboard (Acesso ao site, Produtos mais acessados, Leitura de artigos) com seletor de período, usando os tokens do design system. ✔ As três páginas renderizam os dados dos endpoints em mobile e desktop.

## Summary

Created the three dashboard pages in `admin/app/pages/metricas/` (`site.vue`, `produtos.vue`, `artigos.vue` with redirect in `index.vue`) consuming `/api/metrics/site`, `/api/metrics/products`, and `/api/metrics/articles` with period selection (7, 30, 90, 365 days). Designed reusable components (`PeriodSelector`, `MetricCard`, `MetricsHeader`) using design system tokens, responsive mobile-first dataviz without horizontal overflow, and PT-BR copy.
