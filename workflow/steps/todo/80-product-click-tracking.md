# Fire product_click on shop card click

**Status:** todo

## What to do

Fire a `product_click` event (with `targetId` = product id) when a shop card is clicked in the portal, without interfering with the redirect to the affiliate link. Send it fire-and-forget via `POST /api/track` so the affiliate navigation still happens. Wire this into the existing `ProductCard`/shop components.

## Done criteria

Clicking a product generates a `product_click` event with the correct id and still opens the affiliate link.

## Original line

> Disparar `product_click` (com `targetId` = id do produto) no clique do card da lojinha, sem atrapalhar o redirecionamento ao afiliado. ✔ Clicar num produto gera um evento `product_click` com o id correto e ainda abre o link de afiliado.
