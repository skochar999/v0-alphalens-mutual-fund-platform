---
title: "The Skill Report: How Much of Indian Fund Returns Is Actually Skill?"
slug: the-skill-report
type: report
status: DRAFT — internal review before publishing
data_as_of: June 2026 (current production model)
---

# The Skill Report

### How much of Indian mutual fund performance is genuine stock-picking skill — and how much is just the market?

*Inaugural edition · Data as of June 2026 · Based on AlphaPicker's factor decomposition of 606 active Indian schemes*


---

## The question nobody answers honestly

Every "best funds" list ranks by past returns. But a return is mostly the market rising, plus a few cheap, well-known style and sector tilts. Strip those away and you're left with the only thing that's genuinely the manager's doing — and the only thing worth paying active fees for: **stock-selection skill.**

We measured it. For every active Indian scheme with enough disclosed-holdings history, we decomposed returns against a multi-factor risk model, removed market, style and sector effects, and isolated what remains. Here's what the data says.

## Finding 1 — Skill is real, but small and astonishingly uneven

Of the **280 funds** with at least 12 months of disclosed holdings (enough to judge stock-picking), **67% showed positive stock-selection alpha** and **32% negative**. That sounds encouraging — until you look at the size and spread:

- **Median stock-pick alpha: just +2.2% a year.**
- **The spread runs from −22% to +22% a year.** The middle half of funds sit between **−1.4%** and **+6.5%**.
- Only **51 funds** (about one in six of those rated) delivered **+8%/yr or more** of genuine selection alpha.

The takeaway: real skill exists, but it's modest for most and concentrated in a minority — and the noise is enormous. You cannot eyeball it from a returns chart. A fund returning 18% might have +6% of skill or −2%; the chart looks identical. **Measuring it is the only way to tell.**

## Finding 2 — Skill lives in the corners of the market, not the mainstream

Where managers add stock-picking value is strikingly consistent with how *efficient* each part of the market is:

| Category | Median stock-pick alpha (%/yr) | % of funds positive |
|---|---|---|
| Small Cap | **+8.4** | 93% |
| Mid Cap | +6.2 | 64% |
| Hybrid | +5.2 | 72% |
| Multi Cap | +4.4 | 100% |
| Value / Contrarian | +3.3 | 71% |
| Thematic / Sectoral | +2.0 | 67% |
| Flexi Cap | +1.7 | 61% |
| Focused | +0.4 | 60% |
| Tax Saver (ELSS) | −0.2 | 50% |
| **Large Cap** | **−1.9** | 40% |

The least-efficient corners — small- and mid-cap, where information is scarce and mispricing is common — are where managers earn their keep. The most-efficient, most-researched corner — **large-cap — is where active managers struggle most**, with the median fund *destroying* value versus a passive alternative. This mirrors decades of global evidence, and it has a blunt practical implication: the case for paying active fees is strongest in small/mid-cap, weakest in large-cap.

## Finding 3 — Managers can pick, but they give it back on timing

Decompose the average active manager's value-add and a pattern emerges: their **stock-picking contributes positively (~+3%/yr at the median), but their allocation and timing decisions subtract almost as much (~−3%/yr).** Style and sector tilts wash out close to zero on average.

In plain terms: **the skill is in the picking; the leakage is in the timing.** Managers who could quietly compound their selection edge often hand it back trying to time the market or rotate allocations. It's a reminder that "an active manager" is really several decisions bundled together — and only one of them (selection) shows durable skill.

## Finding 4 — "Beating the benchmark" is not the same as skill

Here's the finding that should end the benchmark-beating obsession. The share of funds that beat their category benchmark swings wildly — from **0% (Mid Cap) and 3% (Large Cap)** to **90% (Flexi Cap) and 100% (Multi Cap)** — over the same period.

Yet mid-cap funds, where **0%** beat the benchmark, showed some of the *highest* stock-selection alpha (median +6.2%/yr, 64% positive). How? Because beating a benchmark depends on the benchmark's own run, the prevailing style environment, and fees — forces that can completely swamp genuine skill in either direction. **A manager can pick stocks well and still trail the index; another can beat it on a lucky style tilt with no skill at all.** Benchmark-beating measures the environment as much as the manager. Decomposition is the only way to separate the two.

## How we measured this (the method, in the open)

Transparency is the point, so here's the engine:

- **Universe:** active, regular-plan, growth-option schemes across equity, hybrid and solution-oriented categories. Index funds, ETFs, fund-of-funds, passive and arbitrage funds are excluded — they aren't trying to pick stocks.
- **The score has three pillars:** **Skill (45%)** — the statistical consistency of pure stock-picking, decomposing each fund's disclosed portfolio against a multi-factor model and testing whether what remains is skill or noise; **Conviction (45%)** — patience (low churn), concentration, and real weight behind top ideas; **Cost (10%)** — every rupee of fees is a rupee off your return.
- **What we ignore:** past returns, star ratings, brand and fund size — none predict future performance, and all are how funds get sold.
- **Validation:** signals must predict out-of-sample. At each historical month we rank funds using only data available then, and measure how that ranking predicted the *next* 12 months. The current formula was directionally correct in **76% of test windows**; ranking by past returns alone predicted nothing.

## What this means for you

1. **Stop ranking by past returns.** They conflate market, factors and skill — the three things you can't tell apart by looking.
2. **Demand more from large-cap active fees.** That's where managers add the least; a low-cost index alternative is a high bar to clear.
3. **Don't mistake a good year for a good manager.** Skill is small and noisy; one year proves little. Persistence is what matters — and what we keep measuring.
4. **Beating the benchmark isn't the test.** Genuine selection skill is.

---

### About this report
The Skill Report is built on AlphaPicker's factor decomposition of Indian mutual funds, refreshed monthly. This inaugural edition uses our current production model; future editions will draw on a deeper, survivorship-free factor history for stronger persistence analysis. Methodology: [how our score works](/#methodology).

*Educational information only. This report provides non-personalised, aggregate analysis and does not constitute investment advice or a recommendation to buy, sell, or hold any security. AlphaPicker is not a distributor and earns no commissions. Mutual funds are subject to market risk; past performance is not indicative of future results. Consult a SEBI-registered investment adviser for advice specific to your situation.*