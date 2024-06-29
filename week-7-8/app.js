const AutoSearch = require("./libaries/autoSearch");

const data = [
    "https://fda.gov", // passed
    "https://www.cdc.gov", // passed
    "https://diabetes.org", // passed
    "https://www.kidney.org", // passed
    "https://scholar.google.com", // pased
    "https://medlineplus.gov", // passed
    "https://www.google.com", // passed
    "https://classic.clinicaltrials.gov", // failed
    "https://www.drugs.com", // passed
    "https://www.centerwatch.com", // passed
    "https://dailymed.nlm.nih.gov", // passed
    "https://go.drugbank.com", // passed
    "https://www.epocrates.com", // failed
    "https://www.everydayhealth.com", // failed
    "https://www.goodrx.com", // failed - navigation
    "https://medscape.com", // passed
    "https://www.merckmanuals.com/home.html", // passed
    "https://www.pdr.net", // passed
    "https://www.ema.europa.eu/en", // passed
    "https://my.clevelandclinic.org/search", // passed
    "https://www.vidal.ru", // passed
    "https://www.rlsnet.ru", // failed - navigation time out
    "https://www.hopkinsmedicine.org", // passed
    "https://attention.plus/search", // failed - navigation time out
    "https://www.mp.pl", // passed
    "https://www.invitro.ru", // passed
    "https://www.bmj.com", // failed
    "https://cse.google.com/cse?cx=009692862532464842631:ckoj05188pi", // passed
    "https://www.103.by", // failed
    "https://lww.com", // failed
    "https://www.acibadem.com.tr", // failed
    "https://www.humanitas.it", // passed
    "https://jamanetwork.com", // passed
    "https://www.sutterhealth.org", // passed
    "https://www.houstonmethodist.org", // failed - navigation time out
    "https://search.aad.org", // passed
    "https://www.m3.com", // failed - website cần đăng nhập
    "https://www.aamc.org", // failed - search sai ô input
    "https://www.mskcc.org", // passed
    "https://www.kenhub.com/en/search", // passed
    "https://fdoc.jp", // passed
    "https://www.aao.org", // passed
    "https://www.massgeneralbrigham.org/en", // failed - form có action bị sai
    "https://www.upmc.com", // failed - search sai ô input
    "https://www.ahajournals.org", // passed
    "https://www.aafp.org", // passed
    "https://www.med.or.jp", // passed
    "https://www.uclahealth.org", // passed
    "https://www.experityhealth.com", // passed
    "https://www.cedars-sinai.org/home.html", // failed
    "https://www.aaos.org", // passed
    "https://www.studentdoctor.net", // passed
    "https://www.bannerhealth.com", // passed but search in search doctor input
    "https://www.bswhealth.com", // passed
    "https://www.haodf.com", // passed - 2 pages
    "https://patents.google.com", // passed
    "https://www.rxlist.com", // passed
    "https://www.getsmartaboutdrugs.gov", // passed
    "https://www.emcdda.europa.eu", //passed
    "https://www.incb.org", // passed
    "https://picscheme.org/en/search", // passed
    "https://www.samhsa.gov", // passed
    "https://www.ecetoc.org", // passed
    "https://www.swissmedic.ch", // passed
    "https://www.pmda.go.jp/english/index.html", // passed - 2 pages
    "https://www.sfda.gov.sa", // passed
    "https://www.sahpra.org.za", // failed - navigation time out
    "https://www.gov.br", // passed
    "https://www.canada.ca/en.html", // passed
    "https://www.medsafe.govt.nz", // passed
    "https://pubchem.ncbi.nlm.nih.gov", // passed
    "https://mohap.gov.ae/en" // failed
];

// failed : 18 / 72 => 25%
// passed : 54 / 72 => 75%


AutoSearch.search( "https://www.med.or.jp", "cancer").then(e => console.log(e));


