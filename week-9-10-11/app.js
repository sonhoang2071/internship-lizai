const CrawlLibrary = require("./libaries/crawl");

const data = [
    "https://fda.gov", // passed
    "https://www.cdc.gov", // passed
    "https://diabetes.org", // passed
    "https://www.kidney.org", // passed -- has search link
    "https://scholar.google.com", // pased -- has search link
    "https://medlineplus.gov", // passed -- next btn
    "https://www.google.com", // passed -- has search link
    "https://classic.clinicaltrials.gov", // failed
    "https://www.drugs.com", // passed -- has search link
    "https://www.centerwatch.com", // passed -- has search link
    "https://dailymed.nlm.nih.gov", // passed -- has search link
    "https://go.drugbank.com", // passed -- has search link
    "https://www.epocrates.com", // failed
    "https://www.everydayhealth.com", // failed
    "https://www.goodrx.com", // failed - navigation
    "https://medscape.com", // passed
    "https://www.merckmanuals.com/home.html", // passed -- next btn
    "https://www.pdr.net", // passed -- next btn
    "https://www.ema.europa.eu/en", // passed -- has search link
    "https://my.clevelandclinic.org/search", // passed -- load more
    "https://www.vidal.ru", // passed -- has search link
    "https://www.rlsnet.ru", // failed - navigation time out
    "https://www.hopkinsmedicine.org", // passed -- has search link
    "https://attention.plus/search", // failed - navigation time out
    "https://www.mp.pl", // passed -- has search link
    "https://www.invitro.ru", // passed -- next btn
    "https://www.bmj.com", // failed
    "https://cse.google.com/cse?cx=009692862532464842631:ckoj05188pi", // passed
    "https://www.103.by", // failed
    "https://lww.com", // failed
    "https://www.acibadem.com.tr", // failed
    "https://www.humanitas.it", // passed // không phân trang
    "https://jamanetwork.com", // passed -- next btn
    "https://www.sutterhealth.org", // passed -- next btn
    "https://www.houstonmethodist.org", // passed - có search link hợp lệ
    "https://search.aad.org", // passed // không có phân trang
    "https://www.m3.com", // failed - website cần đăng nhập
    "https://www.aamc.org", // failed - search sai ô input
    "https://www.mskcc.org", // passed // không có thẻ a , scroll
    "https://www.kenhub.com/en/search", // passed -- more btn
    "https://fdoc.jp", // passed -- has search link
    "https://www.aao.org", // passed -- next btn -- ajax
    "https://www.massgeneralbrigham.org/en", // failed - form có action bị sai
    "https://www.upmc.com", // failed - search sai ô input
    "https://www.ahajournals.org", // passed -- verify
    "https://www.aafp.org", // passed -- next btn ajax
    "https://www.med.or.jp", // passed -- has search link
    "https://www.uclahealth.org", // passed -- has search link
    "https://www.experityhealth.com", // passed
    "https://www.cedars-sinai.org/home.html", // failed
    "https://www.aaos.org", // passed -- next btn ajax
    "https://www.studentdoctor.net", // passed -- /page
    "https://www.bannerhealth.com", // passed but search in search doctor input
    "https://www.bswhealth.com", // passed -- scroll more
    "https://www.haodf.com", // passed - 2 pages
    "https://patents.google.com", // passed
    "https://www.rxlist.com", // passed search --- crawl failed
    "https://www.getsmartaboutdrugs.gov", // passed
    "https://www.emcdda.europa.eu", //passed -- more btn
    "https://www.incb.org", // passed -- has search link
    "https://picscheme.org/en/search", // passed -- google
    "https://www.samhsa.gov", // passed -- has search link
    "https://www.ecetoc.org", // passed search --- crawl failed
    "https://www.swissmedic.ch", // passed -- data load page
    "https://www.pmda.go.jp/english/index.html", // passed - 2 pages
    "https://www.sfda.gov.sa", // passed -- has search link
    "https://www.sahpra.org.za", // failed - navigation time out
    "https://www.gov.br", // passed search --- crawl failed
    "https://www.canada.ca/en.html", // passed -- next btn -- ajax
    "https://www.medsafe.govt.nz", // passed -- google
    "https://pubchem.ncbi.nlm.nih.gov", // passed --- next btn
    "https://mohap.gov.ae/en" // failed
];
CrawlLibrary.crawl("https://www.kidney.org", "cancer").then(e => console.log(e));



