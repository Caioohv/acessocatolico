# Create the admin home with summary cards

**Status:** done

## What to do

Create the admin home with summary cards (period totals) and shortcuts to the sections. Pull the totals from the metrics endpoints and link to products and each dashboard. Use design-system components/tokens, mobile-first.

## Done criteria

The admin home shows the summary numbers and navigates to products and each dashboard.

## Original line

> Criar a home do admin com cards-resumo (totais do período) e atalhos para as seções. ✔ Home do admin mostra os números-resumo e navega para produtos e cada dashboard.

## Summary

Updated `admin/app/pages/index.vue` to fetch period metrics from `/api/metrics/site`, `/api/metrics/products`, `/api/metrics/articles`, and catalog data from `/api/products`, displaying summary metric cards and interactive navigation cards to each section.
