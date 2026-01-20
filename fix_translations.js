const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'constants', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define correct translations for each language
const fixes = [
    { lang: 'ta', search: 'சேவைகளைத் தேடுங்கள்...', weather: 'வானிலை', news: 'அதிகாரப்பூர்வ செய்தி', qr: 'கியூஆர் கனெக்ட்' },
    { lang: 'te', search: 'సేవలను వెతకండి...', weather: 'వాతావరణం', news: 'అధికారిక వార్తలు', qr: 'క్యూఆర్ కనెక్ట్' },
    { lang: 'ml', search: 'സേവനങ്ങൾ തിരയുക...', weather: 'കാലാവസ്ഥ', news: 'ഔദ്യോഗിക വാർത്തകൾ', qr: 'ക്യൂആർ കണക്ട്' },
    { lang: 'bn', search: 'পরিষেবা খুঁজুন...', weather: 'আবহাওয়া', news: 'অফিসিয়াল খবর', qr: 'কিউআর কানেক্ট' },
    { lang: 'mr', search: 'सेवा शोधा...', weather: 'हवामान', news: 'अधिकृत बातम्या', qr: 'क्यूआर कनेक्ट' },
    { lang: 'gu', search: 'સેવાઓ શોધો...', weather: 'હવામાન', news: 'સત્તાવાર સમાચાર', qr: 'ક્યુઆર કનેક્ટ' },
    { lang: 'pa', search: 'ਸੇਵਾਵਾਂ ਖੋਜੋ...', weather: 'ਮੌਸਮ', news: 'ਅਧਿਕਾਰਤ ਖਬਰਾਂ', qr: 'ਕਿਉਆਰ ਕਨੈਕਟ' },
    { lang: 'or', search: 'ସେବା ଖୋଜନ୍ତୁ...', weather: 'ପାଗ', news: 'ସରକାରୀ ଖବର', qr: 'କ୍ୟୁଆର୍ କନେକ୍ଟ' },
    { lang: 'as', search: 'সেৱা বিচাৰক...', weather: 'বতৰ', news: 'চৰকাৰী বাতৰি', qr: 'কিউআৰ সংযোগ' },
    { lang: 'ur', search: 'خدمات تلاش کریں...', weather: 'موسم', news: 'سرکاری خبریں', qr: 'کیو آر کنیکٹ' },
    { lang: 'ks', search: 'تلاش کٕریو...', weather: 'موسم', news: 'سارکأرۍ خبر', qr: 'کیو آر کنیکٹ' },
    { lang: 'kok', search: 'सेवा शोधा...', weather: 'हवामान', news: 'अधिकृत बातम्या', qr: 'क्यूआर कनेक्ट' },
    { lang: 'mni', search: 'অনৌবা সর্ভিসেস থীবীয়ু...', weather: 'নুংশিৎ ফিবম', news: 'অফিসিয়েল পাউ', qr: 'কিউআর কনেক্ট' },
    { lang: 'ne', search: 'सेवाहरू खोज्नुहोस्...', weather: 'मौसम', news: 'आधिकारिक समाचार', qr: 'क्यूआर जडान' },
    { lang: 'sa', search: 'सेवाः अन्विष्यन्ताम्...', weather: 'वातावरणम्', news: 'आधिकारिकवार्ताः', qr: 'क्यूआर-सम्पर्कः' },
    { lang: 'sd', search: 'خدمتون ڳوليو...', weather: 'موسم', news: 'سرڪاري خبرون', qr: 'ڪيو آر ڪنيڪٽ' }
];

// Replace Kannada placeholders with correct translations
const kannadaSearch = 'ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...';
const kannadaWeather = 'ಹವಾಮಾನ';
const kannadaNews = 'ಅಧಿಕೃತ ಸುದ್ದಿ';
const kannadaQr = 'ಕ್ಯೂಆರ್ ಕನೆಕ್ಟ್';

fixes.forEach(fix => {
    const langPattern = new RegExp(`(${fix.lang}:\\s*{[\\s\\S]*?search:\\s*)"${kannadaSearch}"`, 'g');
    content = content.replace(langPattern, `$1"${fix.search}"`);

    const weatherPattern = new RegExp(`(${fix.lang}:\\s*{[\\s\\S]*?weather:\\s*)"${kannadaWeather}"`, 'g');
    content = content.replace(weatherPattern, `$1"${fix.weather}"`);

    const newsPattern = new RegExp(`(${fix.lang}:\\s*{[\\s\\S]*?news:\\s*)"${kannadaNews}"`, 'g');
    content = content.replace(newsPattern, `$1"${fix.news}"`);

    const qrPattern = new RegExp(`(${fix.lang}:\\s*{[\\s\\S]*?qrConnect:\\s*)"${kannadaQr}"`, 'g');
    content = content.replace(qrPattern, `$1"${fix.qr}"`);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Translations fixed successfully!');
