---
title: "Return Decomposition: Where Mutual Fund Returns Actually Come From"
slug: return-decomposition
target_keywords: return decomposition, performance attribution mutual fund, factor model returns
type: guide
level: advanced
---

# Return Decomposition: Where Fund Returns Actually Come From

When a fund returns 18% in a year, the obvious assumption is "the manager is good." Return decomposition tests that assumption — by breaking the return into its real sources and seeing how much is left over for genuine skill. This is the single most important idea behind how AlphaPicker scores funds.

## The four sources of any equity fund's return

Every rupee a fund earns comes from one of four places:

1. **The market** — simply being invested while the market rose. The biggest chunk for almost every fund, and something a cheap index fund delivers for ~0.2% a year.
2. **Style factors** — systematic tilts like small-cap, value, or momentum that have their own long-run returns (see the companion guide on style factors). Available cheaply through factor/index funds.
3. **Sector tilts** — overweighting industries that happened to do well (say, holding more IT or PSU banks than the index).
4. **Stock selection** — the manager's actual picks: choosing the right stocks *within* each style and sector. This is the only part that's genuinely the manager's skill — and the only part you should pay active fees for.

The first three are *systematic* — replicable, cheap, not skill. The fourth, **selection**, is what separates a great manager from a lucky one.

## A worked example

A fund returns **18%** over a year. Let's decompose it (risk-free rate 6%, market excess return 7%, so the market returned ~13%):

| Source | Contribution | What it really is |
|---|---|---|
| Risk-free + **market** (beta 1.05) | **+13.4%** | Just being invested — an index fund gives this |
| **Style** tilts (small-cap + momentum lean) | **+3.0%** | A factor fund could replicate this cheaply |
| **Sector** tilt (overweight a hot sector) | **+1.5%** | Industry bet, not stock-picking |
| **Stock selection** (the residual) | **+0.1%** | The manager's actual skill |
| **Total** | **18.0%** | |

The headline looks like a brilliant 18% year. But once you strip out the market, the style tilts, and the sector bet, the manager's genuine stock-picking added almost **nothing** — about 0.1%. You paid active fees for a result you could have largely assembled from cheap building blocks.

That's the whole point: **a big return can be almost entirely market and factor exposure dressed up as skill.**

## Why this matters for picking funds

Two funds can both return 18%. In one, selection contributed +6% (a genuinely skilled manager); in the other, +0.1% (a manager riding the market and a style tilt). Trailing returns can't tell them apart — they look identical on the chart. Decomposition is the only way to see which manager actually earned their fee, and which one's outperformance is likely to evaporate when the market, style, or sector turns.

## How it's done (briefly)
A multi-factor model regresses the fund's returns against the market and a set of style factors to estimate how much of the return each explains. Whatever the model *can't* explain by market, style, and sector is the **selection** component (often called the residual, or alpha). The cleaner and more survivorship-free the factor data, the more trustworthy the selection estimate.

## The AlphaPicker angle
This is literally what we do. AlphaPicker runs a factor decomposition on every Indian fund, every month, to isolate the **stock-selection skill** hiding inside the headline return — and we use survivorship-free factor data so the "skill" number isn't an artifact of missing, delisted losers. When we say "skill, not luck," this is the machinery underneath it.

---
*Educational information only, not investment advice. Mutual funds are subject to market risk; past performance is not indicative of future results. Consult a SEBI-registered investment adviser for advice specific to you.*
