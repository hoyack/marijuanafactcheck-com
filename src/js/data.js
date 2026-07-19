// Claims database — edit this file to add/update claims
// Each claim: id, text, summary, evidence, verdict, grade, category, sources, uncertainty, lastReviewed
const CLAIMS = [
  {
    id: "mfc-001",
    text: "CBD reduces anxiety in humans.",
    summary: "Several clinical trials show CBD can reduce anxiety in specific contexts (social anxiety, public speaking), but evidence is limited by small sample sizes and short study durations.",
    evidence: "A 2019 retrospective study (n=72) found 79% of patients experienced decreased anxiety scores within the first month of CBD treatment. A 2011 double-blind study (n=24) showed CBD reduced anxiety during a simulated public speaking test compared to placebo. However, most studies are small, short-term, and focused on acute rather than chronic anxiety.",
    verdict: "mostly-true",
    grade: "B",
    category: "health",
    sources: [
      { label: "Shannon et al. (2019)", url: "https://pubmed.ncbi.nlm.nih.gov/30624194/" },
      { label: "Bergamaschi et al. (2011)", url: "https://pubmed.ncbi.nlm.nih.gov/21307846/" },
      { label: "Blessing et al. (2015) — Review", url: "https://pubmed.ncbi.nlm.nih.gov/26341731/" }
    ],
    uncertainty: "medium",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-002",
    text: "Cannabis cures cancer.",
    summary: "No credible evidence supports cannabis as a cancer cure in humans. Some preclinical (lab/cell) studies show cannabinoids may inhibit tumor growth, but human trials are lacking.",
    evidence: "Preclinical studies have shown that cannabinoids (THC, CBD) can inhibit tumor cell growth and induce apoptosis in cell cultures and animal models. A 2019 review in the Journal of the National Cancer Institute found no human clinical trials demonstrating cannabis as a cancer treatment. Anecdotal reports of cannabis 'curing' cancer are not supported by controlled evidence.",
    verdict: "false",
    grade: "F",
    category: "health",
    sources: [
      { label: "NCI Cannabis and Cannabinoids PDQ (2025)", url: "https://www.cancer.gov/about-cancer/treatment/cam/hp/cannabis-pdq" },
      { label: "Abrams & Guzman (2015) — Review", url: "https://pubmed.ncbi.nlm.nih.gov/25916739/" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-003",
    text: "Marijuana is a gateway drug.",
    summary: "The 'gateway' theory is not supported by most modern research. Correlation exists (people who use cannabis are statistically more likely to use other drugs), but causation is not established.",
    evidence: "A 2017 National Academy of Sciences report found moderate evidence that cannabis use is correlated with use of other substances, but noted that most drug users begin with alcohol and nicotine, not cannabis. The correlation may be explained by shared risk factors (genetics, environment, access) rather than cannabis causing subsequent drug use. Animal studies show THC can prime the brain's reward system, but human evidence for a causal gateway effect is weak.",
    verdict: "mostly-false",
    grade: "D",
    category: "science",
    sources: [
      { label: "National Academies (2017) — 'The Health Effects of Cannabis'", url: "https://www.ncbi.nlm.nih.gov/books/NBK423845/" },
      { label: "Secades-Villa et al. (2015)", url: "https://pubmed.ncbi.nlm.nih.gov/25399624/" }
    ],
    uncertainty: "medium",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-004",
    text: "CBD is not psychoactive.",
    summary: "This is misleading. CBD is non-intoxicating (does not cause euphoria or impairment) but is technically psychoactive — it affects brain function, reduces anxiety, and can alter mood and alertness.",
    evidence: "The distinction between 'psychoactive' (affecting the mind) and 'intoxicating' (causing impairment/euphoria) is important. CBD is psychoactive in that it influences anxiety, sleep, and seizure activity via serotonin and other receptors. It is not intoxicating like THC. Many antidepressants and anti-anxiety medications are also psychoactive but non-intoxicating.",
    verdict: "mostly-false",
    grade: "B",
    category: "science",
    sources: [
      { label: "Iffland & Grotenhermen (2017) — CBD Safety Review", url: "https://pubmed.ncbi.nlm.nih.gov/28861514/" },
      { label: "WHO Critical Review of CBD (2018)", url: "https://www.who.int/medicines/access/controlled-substances/CannabidiolCriticalReview.pdf" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-005",
    text: "Cannabis use impairs driving ability.",
    summary: "Strong evidence shows cannabis acutely impairs driving performance, particularly in lane-keeping, reaction time, and divided attention tasks.",
    evidence: "Multiple meta-analyses confirm that acute cannabis use approximately doubles the risk of motor vehicle collision. A 2012 meta-analysis (Asbridge et al.) found a near-doubling of crash risk (OR 1.92). Impairment is dose-dependent and most pronounced within 1-3 hours of use. Combined alcohol and cannabis use produces greater impairment than either alone. However, measuring cannabis impairment is complicated by residual THC in chronic users who may not be acutely impaired.",
    verdict: "mostly-true",
    grade: "A",
    category: "health",
    sources: [
      { label: "Asbridge et al. (2012) — Meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/22353982/" },
      { label: "Hartman & Huestis (2013) — Review", url: "https://pubmed.ncbi.nlm.nih.gov/23135936/" },
      { label: "NHTSA (2017) — Marijuana-Impaired Driving Report", url: "https://www.nhtsa.gov/risky-driving/drug-impaired-driving" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-006",
    text: "Cannabis legalization reduces opioid overdose deaths.",
    summary: "Some ecological studies find an association between medical cannabis laws and reduced opioid overdose mortality, but evidence is mixed and causality is debated.",
    evidence: "A 2014 study (Bachhuber et al.) found that states with medical cannabis laws had 25% lower opioid overdose mortality. However, a 2019 replication with additional years of data (Shover et al.) found the association reversed — medical cannabis laws were associated with increased overdose mortality in more recent years. Ecological studies cannot establish individual-level causation.",
    verdict: "mixed",
    grade: "C",
    category: "law",
    sources: [
      { label: "Bachhuber et al. (2014)", url: "https://pubmed.ncbi.nlm.nih.gov/25154332/" },
      { label: "Shover et al. (2019)", url: "https://pubmed.ncbi.nlm.nih.gov/31194279/" },
      { label: "National Academies (2017) — Chapter on Injury and Death", url: "https://www.ncbi.nlm.nih.gov/books/NBK425742/" }
    ],
    uncertainty: "high",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-007",
    text: "THC potency in cannabis has increased over time.",
    summary: "Well-documented: average THC concentrations in seized cannabis have risen substantially since the 1970s, from approximately 1-4% to 15-30%+ today.",
    evidence: "Data from the University of Mississippi's Potency Monitoring Program (funded by NIDA) shows average THC in seized cannabis flower rose from under 4% in the 1990s to over 15% by 2018. Concentrates can exceed 60-90% THC. This increase is attributed to selective breeding, improved cultivation techniques, and market demand for higher-potency products.",
    verdict: "mostly-true",
    grade: "A",
    category: "market",
    sources: [
      { label: "ElSohly et al. (2016) — Potency Trends 1995-2014", url: "https://pubmed.ncbi.nlm.nih.gov/26903403/" },
      { label: "Chandra et al. (2019) — New Trends in Cannabis Potency", url: "https://pubmed.ncbi.nlm.nih.gov/31046987/" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-008",
    text: "Hemp seed oil is the same as CBD oil.",
    summary: "False. Hemp seed oil is extracted from hemp seeds and contains negligible CBD. CBD oil is extracted from cannabis flowers/leaves and contains concentrated cannabidiol.",
    evidence: "Hemp seed oil is a culinary/industrial oil pressed from Cannabis sativa seeds. It contains fatty acids, vitamins, and minerals — but virtually no cannabinoids (including CBD). CBD oil is extracted from the flowers, leaves, and stalks of cannabis plants bred for high CBD content. Products labeled 'hemp oil' may be either — consumers must check ingredients and third-party lab results.",
    verdict: "false",
    grade: "A",
    category: "market",
    sources: [
      { label: "Leizer et al. (2000)", url: "https://pubmed.ncbi.nlm.nih.gov/11200959/" },
      { label: "FDA — What You Need to Know About CBD (2020)", url: "https://www.fda.gov/consumers/consumer-updates/what-you-need-know-and-what-were-working-find-out-about-products-containing-cannabis-or-cannabis" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-009",
    text: "Cannabis is addictive.",
    summary: "Approximately 9% of cannabis users develop a cannabis use disorder (CUD), rising to 17% for those who start in adolescence. Withdrawal symptoms are documented.",
    evidence: "DSM-5 recognizes Cannabis Use Disorder as a diagnosable condition. A 2015 study (Hasin et al.) estimated 12-month CUD prevalence at 2.5% of the US population. Risk factors include early initiation, frequent use, high-potency products, and genetic vulnerability. Withdrawal symptoms include irritability, sleep difficulty, decreased appetite, and craving. The addiction risk is lower than for alcohol (15%), nicotine (32%), or heroin (23%), but higher than for psychedelics.",
    verdict: "mostly-true",
    grade: "A",
    category: "health",
    sources: [
      { label: "Hasin et al. (2015) — JAMA Psychiatry", url: "https://pubmed.ncbi.nlm.nih.gov/26502107/" },
      { label: "Volkow et al. (2014) — NEJM Review", url: "https://pubmed.ncbi.nlm.nih.gov/24905937/" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-010",
    text: "No one has ever died from a cannabis overdose.",
    summary: "Largely true in the sense of direct lethal toxicity, but cannabis has been implicated in deaths indirectly (e.g., impaired driving, cardiovascular events in vulnerable individuals).",
    evidence: "The lethal dose (LD50) of THC is extraordinarily high — estimated at thousands of times a typical dose in animal models. No confirmed human deaths from THC toxicity alone exist. However, case reports document cardiovascular events (heart attacks, arrhythmias) temporally associated with cannabis use in individuals with pre-existing conditions. Cannabis-impaired driving contributes to fatal collisions. The claim 'no one has ever died from cannabis' oversimplifies a complex picture.",
    verdict: "mostly-true",
    grade: "B",
    category: "health",
    sources: [
      { label: "Drummer et al. (2019)", url: "https://pubmed.ncbi.nlm.nih.gov/30597344/" },
      { label: "Jouanjus et al. (2014) — Cardiovascular Complications", url: "https://pubmed.ncbi.nlm.nih.gov/24776789/" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-011",
    text: "The US federal government holds a patent on cannabinoids as antioxidants and neuroprotectants.",
    summary: "True but misleading. US Patent 6,630,507 covers cannabinoids as neuroprotectants and antioxidants, but a patent does not equal FDA approval. The patent was filed based on preclinical research.",
    evidence: "US Patent 6,630,507 ('Cannabinoids as antioxidants and neuroprotectants') was awarded to the US Department of Health and Human Services in 2003. The patent covers the use of non-psychoactive cannabinoids for oxidative stress-related diseases. However, a patent represents a claim of invention, not a proven therapy. This patent is often cited by advocates to suggest the government 'knows cannabis cures everything' — which misrepresents what a patent is.",
    verdict: "mostly-true",
    grade: "A",
    category: "law",
    sources: [
      { label: "US Patent 6,630,507 — Full Text", url: "https://patents.google.com/patent/US6630507B1/en" },
      { label: "NIH — Cannabinoids and Oxidative Stress (Background)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1253627/" }
    ],
    uncertainty: "low",
    lastReviewed: "2026-07-19"
  },
  {
    id: "mfc-012",
    text: "Cannabis use during pregnancy is safe.",
    summary: "Evidence suggests potential risks to fetal development. Most medical organizations recommend against cannabis use during pregnancy.",
    evidence: "Studies link prenatal cannabis exposure to lower birth weight (meta-analysis OR 1.77), possible neurodevelopmental effects, and behavioral issues in childhood. The American College of Obstetricians and Gynecologists (ACOG) and the American Academy of Pediatrics (AAP) recommend against cannabis use during pregnancy and lactation. THC crosses the placenta and is detectable in breast milk. However, confounding factors (tobacco/alcohol co-use, socioeconomic variables) make causality difficult to isolate.",
    verdict: "mostly-false",
    grade: "B",
    category: "health",
    sources: [
      { label: "ACOG Committee Opinion (2020)", url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/10/marijuana-use-during-pregnancy-and-lactation" },
      { label: "Gunn et al. (2016) — Meta-analysis", url: "https://pubmed.ncbi.nlm.nih.gov/27048634/" }
    ],
    uncertainty: "medium",
    lastReviewed: "2026-07-19"
  }
];

// Expose for module use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CLAIMS;
}
