---
title: "How to Read Mutual Fund Returns: CAGR, Absolute Returns, XIRR & Rolling Returns"
slug: reading-fund-returns
target_keywords: cagr vs absolute return, xirr in mutual funds, rolling returns
type: guide
---

# How to Read Mutual Fund Returns

A "return" sounds simple, but a fund can quote four different numbers for the same performance — and pick the one that flatters it most. Here's how to read each correctly, with examples.

## Absolute return vs CAGR

**Absolute return** is the total gain, ignoring time. **CAGR** (Compound Annual Growth Rate) converts that into a smoothed yearly rate, so you can compare investments held for different periods.

> **Example.** You invest ₹1,00,000 and it grows to ₹1,50,000 — a **50% absolute return**.
> - If that took **3 years**, the CAGR is about **14.5% a year** — excellent.
> - If it took **10 years**, the CAGR is about **4.1% a year** — worse than a fixed deposit.
> Same 50%, completely different quality. Time is everything.

**How to read it:** for anything held over a year, CAGR is the meaningful number. Be suspicious of big absolute figures ("up 120%!") that hide a long holding period.

## XIRR — the honest number for SIPs

CAGR assumes you invested one lump sum on day one. But with a SIP, each instalment compounds for a different length of time, so CAGR overstates or understates your real return. **XIRR** accounts for the date and size of every cash flow and gives one annualised figure that reflects what *you* actually earned.

> **Example.** You run a ₹10,000 monthly SIP for 12 months — you've put in ₹1,20,000. It's now worth ₹1,32,000, a 10% *absolute* gain. But your early instalments were invested for nearly a year and your latest one for barely a month. The true annualised return — the **XIRR** — works out closer to **18%**, because most of your money was invested for far less than a full year. Quoting "10%" would understate your fund's actual performance.

**How to calculate it:** use the `XIRR()` function in Excel or Google Sheets — list every instalment as a negative amount with its date, then the current value as a positive amount. Use XIRR for any SIP.

## Rolling returns — beating date-luck

A "point-to-point" return uses one start and one end date — which can flatter or punish a fund depending on where those dates fall. **Rolling returns** instead measure performance over *every* possible window in a span, showing the range of outcomes rather than one lucky snapshot.

> **Example.** A fund's website shows a "5-year return of 18% CAGR." But that single window happened to start right after a market crash. Its **3-year rolling returns** over the last decade tell a fuller story: best window +22%, worst window −2%, average +11%. Now you know the 18% was a favourable starting point, not the norm — and you can see how the fund behaves across many entry points, closer to your real experience.

**How to read it:** prefer a fund with a high *and consistent* rolling-return record (good average, not-too-painful worst case) over one with a single dazzling trailing number.

## The AlphaPicker angle
All of these tell you *how much* a fund returned — none tell you *why*. A high CAGR in a bull market may be mostly the market rising, not the manager's doing. Our scoring takes the next step: separating the market, style, and sector components from the manager's genuine stock-selection skill — the part most likely to repeat.

---
*Educational information only, not investment advice. Mutual funds are subject to market risk; past performance is not indicative of future results. Consult a SEBI-registered investment adviser for advice specific to you.*
