
// Shared JavaScript across all pages
console.log('Flamazing Flora Explorer loaded');

// Audio management
class AudioManager {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
    }

    playAudio(audioUrl, buttonElement) {
        // Stop current audio if playing
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.resetButtonStates();
        }

        // Create new audio element
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.play();
        this.isPlaying = true;

        // Update button state
        if (buttonElement) {
            buttonElement.innerHTML = '<i data-feather="pause" class="inline mr-2"></i>Durdur';
            feather.replace();
        }

        // Add event listener for when audio ends
        this.currentAudio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.resetButtonStates();
        });
    }

    pauseAudio(buttonElement) {
        if (this.currentAudio && this.isPlaying) {
            this.currentAudio.pause();
            this.isPlaying = false;
            if (buttonElement) {
                buttonElement.innerHTML = '<i data-feather="play" class="inline mr-2"></i>Oynat';
                feather.replace();
            }
        }
    }

    resetButtonStates() {
        // Reset all audio buttons to play state
        const buttons = document.querySelectorAll('.audio-button');
        buttons.forEach(button => {
            button.innerHTML = '<i data-feather="volume-2" class="inline mr-2"></i>Sesli Anlat';
        });
        feather.replace();
    }
}

// Initialize audio manager
const audioManager = new AudioManager();

// Plant data management
const plantData = {
    plants: [
        {
            id: 1,
            name: "Aloe Vera",
            scientificName: "Aloe barbadensis",
            image: "images/plants/aloe-vera.jpg",
            description: "Aloe vera, etli yapraklara sahip, rozet biçiminde dizilen, her dem yeşil bir sukulenttir. Bu tropik bitki, sıcak, güneşli iklimleri ve iyi drene edilmiş, kumlu toprakları tercih eder; don ve uzun süreli soğuk ( ) onun için ciddi bir tehdittir. Yapraklarının mumsu tabakası, kurak ortamlarda hayati önem taşıyan su kaybını en aza indiren önemli bir adaptasyondur. Bitki 60-100 cm boya ulaşabilir ve kalın, mızrak şeklindeki yapraklarının içinde su, vitamin ve mineraller açısından zengin, saydam bir jel barındırır. Bu jel, binlerce yıldır cilt onarımı ve sağlık alanında \"Ölümsüzlük Bitkisi\" unvanını hak ettiğini düşündürmüştür. Aloe vera'nın yaprak dokusu yüksek sıcaklıkta kolayca zarar görerek yanar; bu da genel olarak yangına dayanıklılığının düşük olduğunu gösterir. Ancak, bitkinin hayatta kalma stratejisi kök sisteminde gizlidir. Kök kısmı, hafif yüzey yangınlarından sonra yeniden sürgün verme yeteneğine sahiptir. Bu kritik özellik, bitkinin doğal yaşam alanlarında yangın sonrası ekosistemlerde bitkisel örtünün kısmen ve hızlı bir şekilde yenilenmesine olanak tanır. Kanımca, doğanın bu güçlü onarım mekanizması, basit bir sukulentin ne kadar dirençli olabileceğinin şaşırtıcı bir kanıtıdır.",
            burnSpeed: "Çok Düşük",
            fireResistance: "Çok Yüksek",
            protectionMechanism: "Yüksek su içeriği ve jel yapısı",
            audioUrl: "audio/plants/aloe-vera.mp3"
        },
        {
            id: 2,
            name: "Kaktüs",
            scientificName: "Cactaceae",
            image: "images/plants/kaktus.jpg",
            description: "Kaktüs (Cactaceae), çoğunlukla kurak ve yarı kurak bölgelere özgü, su depolama yeteneği yüksek bir sukulent familyasıdır. Bitkinin etli gövdesi genellikle silindirik veya küresel biçimdedir ve temel fotosentez organı olarak işlev görür. Dikenler, evrimleşmiş yapraklardır; bunlar hem su kaybını azaltır hem de otçul hayvanlara karşı savunma sağlar. Gövde yüzeyini kaplayan kalın, mumsu tabaka, suyun buharlaşmasını minimuma indirerek çöl koşullarına mükemmel bir adaptasyon sağlar.\n\nKaktüsler, bol güneş ışığı alan, sıcak ve özellikle drenajı çok iyi olan topraklarda gelişim gösterir; soğuk ve dona karşı son derece hassastırlar. Yangına karşı dayanıklılıkları türler arasında farklılık gösterse de, genel olarak sınırlıdır. Gövdede depolanan yüksek su içeriği, kısa süreli yüzey yangınlarında bitkiye kısmi bir koruma sunabilir. Ancak yoğun ve uzun süreli yangınlarda etli dokular tamamen zarar görür. Buna karşın, bazı kaktüs türleri, tıpkı yangından sonra doğanın pes etmemesi gibi, taban veya kök sisteminden yeniden filizlenme potansiyeline sahiptir. Bence, dikenlerinin arasında gizlediği bu canlılık ve direnç, kaktüsü zorlu koşullarda bile yaşamın sessiz ve güçlü bir simgesi yapar.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Su depolama ve kalın epidermis",
            audioUrl: "audio/plants/kaktus.mp3"
        },
        {
            id: 3,
            name: "Ada Çayı",
            scientificName: "Salvia officinalis",
            image: "images/plants/ada-cayi.jpg",
            description: "Adaçayı (Salvia officinalis), ballıbabagiller familyasına ait, 30-70 cm boya ulaşabilen, çok yıllık, aromatik bir yarı çalıdır. Akdeniz bölgesine özgü olan bitki, sıcak, tam güneşli ve drenajı yüksek topraklarda en iyi gelişimi gösterir. Yaprakları grimsi-yeşil renkte ve kadifemsi dokudadır; bu tüylü yapı, su kaybını azaltarak kuraklığa karşı direnç sağlar. Çiçekleri mor tonlarda olup, genellikle yaz başlarında açar.\n\nAdaçayının dokularında yüksek konsantrasyonda uçucu yağlar (başlıca Thujone, Cineole, Borneol) bulunur. Bu yağlar, bitkinin güçlü aromasını oluşturmakla birlikte, maalesef yanıcılığını da artırır. Bu nedenle yangına dayanıklılığı orta düzeydedir. Odunsu gövdesi ve toprak üstü kısmı yangında hızla tutuşup zarar görse de, bitkinin hayatta kalma mekanizması kökleridir.\n\nDerin ve sağlam kök sistemi, yüzey yangınlarından sonra hızla yeniden filizlenme yeteneği sunar. Bu ekolojik adaptasyon, adaçayının yangın sonrası alanlarda bitkisel örtünün kısmen yenilenmesine katkı sağlamasına olanak tanır. Bana kalırsa, zorlu koşullara rağmen bu güçlü kokusuyla yeniden hayata tutunabilmesi, adaçayını doğanın pes etmeyen direncinin sembolü hâline getirir.",
            burnSpeed: "Orta",
            fireResistance: "Orta",
            protectionMechanism: "Aromatik bileşenler ve yaprak yapısı",
            audioUrl: "audio/plants/ada-cayi.mp3"
        },
        {
            id: 4,
            name: "Lavanta",
            scientificName: "Lavandula angustifolia",
            image: "images/plants/lavanta.jpg",
            description: "Lavanta (Lavandula spp.), 30-80 cm boya ulaşabilen, çok yıllık ve yarı çalı formunda aromatik bir bitkidir. Akdeniz iklimine özgü olup, sıcak, güneşli ortamları ve kireççe zengin, iyi drene edilmiş, geçirgen toprakları tercih eder. Mor tonlardaki çiçekleri ve gümüşi-yeşil, dar yapraklarıyla tanınır.\n\nBitkinin yaprak ve çiçeklerinde yüksek oranda uçucu yağlar (başlıca Linalool ve Linalil Asetat) bulunur; bu bileşenler ona karakteristik güçlü kokusunu ve antiseptik özelliklerini kazandırır. Ancak, bu yağların varlığı yanıcılığı artırabilir, bu nedenle yoğun lavanta alanlarında yangın riski tamamen ortadan kalkmaz.\n\nYangına karşı genel olarak orta düzeyde dayanıklılık sergiler. Odunsu gövdesi yüksek ısıda kolayca zarar görse de, geliştirdiği derin kök sistemi sayesinde yüzey yangınlarından sonra yeniden filizlenme yeteneği mevcuttur. Bu hızlı toparlanma gücü, lavantanın doğal yaşam döngüsünde önemli bir direnç karakteridir. Kanımca, mor çiçeklerin yaydığı o huzur verici koku, en zorlu koşullarda bile yaşamın ve canlılığın devam etme kararlılığını fısıldar gibidir.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Uçucu yağ bileşenleri",
            audioUrl: "audio/plants/lavanta.mp3"
        },
        {
            id: 5,
            name: "Biberiye",
            scientificName: "Rosmarinus officinalis",
            image: "images/plants/biberiye.jpg",
            description: "Aromatik yağları ve kalın yaprakları yangına karşı koruma sağlar.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Aromatik yağlar ve kalın epidermis",
            audioUrl: "audio/plants/biberiye.mp3"
        },
        {
            id: 6,
            name: "Defne",
            scientificName: "Laurus nobilis",
            image: "images/plants/defne.jpg",
            description: "Kalın yaprakları ve uçucu yağları yangın direncini artırır.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Kalın yaprak yapısı ve uçucu yağlar",
            audioUrl: "audio/plants/defne.mp3"
        },
        {
            id: 7,
            name: "Zeytin",
            scientificName: "Olea europaea",
            image: "images/plants/zeytin.jpg",
            description: "Kalın gövde ve yaprakları ile yangına karşı dayanıklıdır.",
            burnSpeed: "Çok Düşük",
            fireResistance: "Çok Yüksek",
            protectionMechanism: "Kalın kabuk ve yaprak yapısı",
            audioUrl: "audio/plants/zeytin.mp3"
        },
        {
            id: 8,
            name: "Etli Sukulentler",
            scientificName: "Succulentae",
            image: "images/plants/etli-sukulentler.jpg",
            description: "Su depolama özelliği ve kalın epidermis ile yangına karşı çok dayanıklıdır.",
            burnSpeed: "Çok Düşük",
            fireResistance: "Çok Yüksek",
            protectionMechanism: "Su depolama ve kalın epidermis",
            audioUrl: "audio/plants/etli-sukulentler.mp3"
        },
        {
            id: 9,
            name: "Akasya",
            scientificName: "Acacia",
            image: "images/plants/akasya.jpg",
            description: "Kalın kabuk ve yaprak yapısı yangın direncini etkiler.",
            burnSpeed: "Orta",
            fireResistance: "Orta",
            protectionMechanism: "Kalın kabuk ve yaprak yapısı",
            audioUrl: "audio/plants/akasya.mp3"
        },
        {
            id: 10,
            name: "Ortanca",
            scientificName: "Hydrangea",
            image: "images/plants/ortanca.jpg",
            description: "Yüksek su içeriği ve yaprak yapısı yangına karşı koruma sağlar.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Yüksek su içeriği ve yaprak yapısı",
            audioUrl: "audio/plants/ortanca.mp3"

        },
        {
            id: 11,
            name: "Kekik",
            scientificName: "Thymus vulgaris",
            image: "images/plants/kekik.jpg",
            description: "Kekik (Thymus vulgaris), ballıbabagiller familyasına ait, 10-40 cm boya ulaşabilen, çok yıllık ve aromatik bir yarı çalıdır. Akdeniz bölgesine özgü olup, sıcak, güneşli ortamları ve iyi drene edilmiş, kumlu toprakları tercih eder. Küçük, oval yaprakları ve pembe-mor çiçekleriyle tanınır.\n\nBitkinin yapraklarında yüksek oranda uçucu yağlar (başlıca Thymol ve Carvacrol) bulunur; bu bileşenler ona güçlü aromasını ve antiseptik özelliklerini kazandırır. Uçucu yağlar aynı zamanda bitkinin yangına karşı direncini artıran önemli bir faktördür.\n\nYangına karşı yüksek düzeyde dayanıklılık sergiler. Odunsu gövdesi ve toprak üstü kısmı yangında görece yavaş yanar ve uçucu yağlarının yanıcı etkisi sınırlıdır. Derin kök sistemi sayesinde yüzey yangınlarından sonra hızla yeniden filizlenme yeteneği mevcuttur. Bu güçlü toparlanma gücü, kekikin doğal yaşam döngüsünde önemli bir direnç karakteridir. Bana kalırsa, güçlü kokusu ve dayanıklılığıyla kekik, doğanın zorlu koşullara karşı geliştirdiği mükemmel bir adaptasyon örneğidir.",
            burnSpeed: "Düşük",
            fireResistance: "Yüksek",
            protectionMechanism: "Uçucu yağlar ve aromatik bileşenler",
            audioUrl: "audio/plants/kekik.mp3"
        },
        {
            id: 12,
            name: "Şimşir",
            scientificName: "Buxus sempervirens",
            image: "images/plants/simshir.jpg",
            description: "Şimşir (Buxus sempervirens), şimşirgiller familyasına ait, 1-10 m boya ulaşabilen, çok yavaş büyüyen, her dem yeşil bir çalı veya küçük ağaçtır. ılıman iklimlere özgü olup, yarı gölge veya tam güneşli ortamları ve nemli, iyi drene edilmiş toprakları tercih eder. Küçük, oval, parlak yeşil yaprakları ve yoğun dallarıyla tanınır.\n\nBitkinin yoğun yaprak yapısı ve kalın epidermis tabakası, su kaybını azaltarak kuraklığa karşı direnç sağlar. Ancak, odunsu gövdesi ve dalları yangında orta düzeyde hassasiyet gösterir.\n\nYangına karşı orta düzeyde dayanıklılık sergiler. Yoğun yaprak örtüsü ve toprak üstü kısmı yangında orta hızda yanabilir, ancak kalın kabuğu kısmi bir koruma sağlar. Yüzey yangınlarından sonra kök sisteminden yeniden filizlenme yeteneği mevcuttur. Bu özelliği sayesinde yangın sonrası alanlarda bitkisel örtünün kısmen yenilenmesine katkı sağlayabilir. Kanımca, şimşirin dayanıklılığı, yoğunluğuyla orantılıdır ve bahçe düzenlemelerinde tercih edilmesinin bir nedenidir.",
            burnSpeed: "Orta",
            fireResistance: "Orta",
            protectionMechanism: "Yoğun yaprak yapısı ve kalın gövde",
            audioUrl: "audio/plants/simshir.mp3"
        },
        {
            id: 13,
            name: "Paraçiçeği",
            scientificName: "Helianthus annuus",
            image: "images/plants/paracicegi.jpg",
            description: "Ayçiçeği (Helianthus annuus), papatyagiller familyasına ait, 1-3 m boya ulaşabilen, yıllık bir bitkidir. Güneşli, sıcak ortamları ve verimli, iyi drene edilmiş toprakları tercih eder. Büyük, sarı çiçek başları ve geniş yapraklarıyla tanınır.\n\nBitkinin gövdesinde ve yapraklarında yüksek su içeriği bulunur; bu özellik kuraklığa karşı bir adaptasyon olsa da, yangına karşı sınırlı koruma sağlar. Ancak, bitkinin yıllık doğası ve hızlı büyüme özelliği, yangın sonrası ekosistemlerde önemli bir rol oynayabilir.\n\nYangına karşı orta düzeyde dayanıklılık sergiler. Su içeriği yüksek olan dokuları yangında orta hızda yanabilir. Yıllık bitki olması nedeniyle kök sistemi yüzeyseldir ve yangın sonrası yeniden filizlenme yeteneği sınırlıdır. Bununla birlikte, tohumları yüksek ısıya karşı dirençli olabilir ve yangın sonrası alanlarda hızlı çimlenme gösterebilir. Bana kalırsa, ayçiçeğinin güzelliği ve büyüme hızı, doğanın yangın sonrası toparlanma sürecinde önemli bir sembol haline gelir.",
            burnSpeed: "Orta",
            fireResistance: "Orta",
            protectionMechanism: "Yüksek su içeriği ve gövde yapısı",
            audioUrl: "audio/plants/para-cicegi.mp3"

        }
    ],

    getPlantById(id) {
        return this.plants.find(plant => plant.id === parseInt(id));
    },

    getAllPlants() {
        return this.plants;
    },

    getFireResistantPlants() {
        return this.plants.filter(plant => plant.fireResistance === "Yüksek" || plant.fireResistance === "Çok Yüksek");
    },

    getFastBurningPlants() {
        return this.plants.filter(plant => plant.burnSpeed === "Yüksek" || plant.burnSpeed === "Çok Yüksek");
    }
};

// Utility functions
const utils = {
    formatBurnSpeed(speed) {
        const speedMap = {
            "Çok Düşük": "bg-green-100 text-green-800",
            "Düşük": "bg-green-50 text-green-700",
            "Orta": "bg-yellow-100 text-yellow-800",
            "Yüksek": "bg-orange-100 text-orange-800",
            "Çok Yüksek": "bg-red-100 text-red-800"
        };
        return speedMap[speed] || "bg-gray-100 text-gray-800";
    },

    formatFireResistance(resistance) {
        const resistanceMap = {
            "Çok Düşük": "bg-red-100 text-red-800",
            "Düşük": "bg-orange-100 text-orange-800",
            "Orta": "bg-yellow-100 text-yellow-800",
            "Yüksek": "bg-green-100 text-green-800",
            "Çok Yüksek": "bg-green-200 text-green-900"
        };
        return resistanceMap[resistance] || "bg-gray-100 text-gray-800";
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for use in other modules
window.audioManager = audioManager;
window.plantData = plantData;
window.utils = utils;

// THEME: Dark mode support (refined)
(function() {
    const THEME_KEY = 'theme';
    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    }
    function getTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        return (saved === 'dark' || saved === 'light') ? saved : 'light';
    }
    function setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
        const btn = document.getElementById('theme-toggle');
        if (btn) updateButtonStyle(btn, theme);
    }

    function updateButtonStyle(btn, theme) {
        btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        btn.textContent = theme === 'dark' ? '🌙' : '☀️';
        if (theme === 'dark') {
            btn.style.background = 'rgba(31,41,55,0.9)';
            btn.style.color = '#e5e7eb';
            btn.style.border = '1px solid rgba(255,255,255,0.15)';
            btn.style.boxShadow = '0 10px 24px rgba(0,0,0,0.45)';
        } else {
            btn.style.background = '#ffffff';
            btn.style.color = '#111827';
            btn.style.border = '1px solid rgba(0,0,0,0.12)';
            btn.style.boxShadow = '0 10px 24px rgba(0,0,0,0.15)';
        }
    }

    function ensureToggleButton() {
        if (document.getElementById('theme-toggle')) return;
        const btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.type = 'button';
        btn.title = 'Tema: Açık/Karanlık';
        btn.setAttribute('aria-label', 'Tema değiştir');
        btn.style.position = 'fixed';
        btn.style.right = 'max(14px, env(safe-area-inset-right, 0px))';
        btn.style.top = 'max(14px, env(safe-area-inset-top, 0px))';
        btn.style.zIndex = '2147483647';
        btn.style.padding = '10px 12px';
        btn.style.borderRadius = '9999px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '700';
        btn.style.fontSize = '16px';
        btn.style.lineHeight = '1';
        btn.style.touchAction = 'manipulation';
        btn.style.backdropFilter = 'blur(8px)';
        btn.style.webkitBackdropFilter = 'blur(8px)';
        const current = getTheme();
        updateButtonStyle(btn, current);
        btn.addEventListener('click', () => {
            const next = (root.classList.contains('dark') ? 'light' : 'dark');
            setTheme(next);
        });
        // Mobile sizing
        if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
            btn.style.padding = '12px 14px';
            btn.style.fontSize = '18px';
        }
        document.body.appendChild(btn);
    }

    applyTheme(getTheme());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureToggleButton, { once: true });
    } else if (document.body) {
        ensureToggleButton();
    } else {
        window.addEventListener('load', ensureToggleButton, { once: true });
    }
})();


// Tanıtım Videosu: Site genelinde tek buton
(function() {
    const VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Burayı kendi tanıtım linkinle değiştir
    const MODAL_ID = 'intro-video-modal-backdrop';

    function getEmbedUrl() {
        try {
            const url = new URL(VIDEO_URL);
            // watch?v=... → embed/...
            if (url.hostname.includes('youtube.com') && url.pathname === '/watch' && url.searchParams.get('v')) {
                const v = url.searchParams.get('v');
                return `https://www.youtube.com/embed/${v}?rel=0&autoplay=1`;
            }
            // youtu.be/ID → embed/ID
            if (url.hostname.includes('youtu.be')) {
                const id = url.pathname.replace('/', '');
                if (id) {
                    return `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;
                }
            }
        } catch(e) {
            // Fallback aşağıda
        }
        // Kullanıcı direkt embed link verirse aynen kullan
        return VIDEO_URL;
    }

    function ensureModal() {
        let backdrop = document.getElementById(MODAL_ID);
        if (backdrop) return backdrop;

        backdrop = document.createElement('div');
        backdrop.id = MODAL_ID;
        backdrop.className = 'intro-video-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.setAttribute('aria-label', 'Tanıtım videosu');
        backdrop.style.display = 'none';

        const modal = document.createElement('div');
        modal.className = 'intro-video-modal';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'intro-video-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Videoyu kapat');

        const frameWrap = document.createElement('div');
        frameWrap.className = 'intro-video-frame-wrap';

        const iframe = document.createElement('iframe');
        iframe.className = 'intro-video-iframe';
        iframe.setAttribute('title', 'Flora Yanma Atlası Tanıtım Videosu');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');

        frameWrap.appendChild(iframe);
        modal.appendChild(closeBtn);
        modal.appendChild(frameWrap);
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        function closeModal() {
            backdrop.style.opacity = '0';
            setTimeout(() => {
                backdrop.style.display = 'none';
                iframe.src = '';
            }, 180);
        }

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && backdrop.style.display === 'flex') {
                closeModal();
            }
        });

        // expose close for debugging if needed
        backdrop._closeIntroVideo = closeModal;

        return backdrop;
    }

    function openIntroVideo() {
        const backdrop = ensureModal();
        const iframe = backdrop.querySelector('.intro-video-iframe');
        iframe.src = getEmbedUrl();
        backdrop.style.display = 'flex';
        // küçük bir timeout ile fade animasyonu düzgün başlasın
        requestAnimationFrame(() => {
            backdrop.style.opacity = '1';
        });
    }

    function createIntroButton() {
        if (document.getElementById('intro-video-toggle')) return;

        const wrap = document.createElement('div');
        wrap.id = 'intro-video-toggle';

        wrap.style.position = 'fixed';
        wrap.style.left = 'max(14px, env(safe-area-inset-left, 0px))';
        wrap.style.bottom = 'max(14px, env(safe-area-inset-bottom, 0px))';
        wrap.style.zIndex = '2147483647';


        const btn = document.createElement('button');
        btn.type = 'button';
        btn.title = 'Tanıtım Videosu';
        btn.setAttribute('aria-label', 'Tanıtım videosunu aç');
        btn.style.padding = '10px 16px';

        btn.style.borderRadius = '9999px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '700';
        btn.style.fontSize = '14px';
        btn.style.lineHeight = '1';

        btn.style.touchAction = 'manipulation';
        btn.style.display = 'inline-flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '6px';
        btn.innerHTML = '<span>▶️</span><span>Tanıtım Videosu</span>';

        btn.addEventListener('click', openIntroVideo);

        // Mobile sizing
        if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
            btn.style.padding = '12px 18px';
            btn.style.fontSize = '16px';
        }

        // Dark theme sync
        // Tema değişiminde renkler CSS üzerinden yönetiliyor; burada ekstra inline stil vermiyoruz.

        wrap.appendChild(btn);
        document.body.appendChild(wrap);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createIntroButton, { once: true });
    } else if (document.body) {
        createIntroButton();
    } else {
        window.addEventListener('load', createIntroButton, { once: true });

    }
})();

// 🎥 Ultra Gelişmiş Tanıtım Videosu Sistemi
(function() {
    'use strict';

    let introVideoModal = null;
    let isModalOpen = false;

    // Manyetik cursor efekti
    function initMagneticEffect() {
        const introToggle = document.getElementById('intro-video-toggle');
        if (!introToggle) return;

        let mouseX = 0, mouseY = 0;
        let toggleX = 0, toggleY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateMagneticEffect() {
            const rect = introToggle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // 150px yarıçap içinde çekim etkisi
            if (distance < 150) {
                const strength = (150 - distance) / 150;
                const moveX = deltaX * strength * 0.3;
                const moveY = deltaY * strength * 0.3;

                introToggle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                introToggle.classList.add('magnetic');
            } else {
                introToggle.style.transform = '';
                introToggle.classList.remove('magnetic');
            }

            requestAnimationFrame(updateMagneticEffect);
        }

        updateMagneticEffect();
    }

    // Modal oluşturma
    function createVideoModal() {
        if (introVideoModal) return;

        introVideoModal = document.createElement('div');
        introVideoModal.className = 'intro-video-backdrop';
        introVideoModal.innerHTML = `
            <div class="intro-video-modal">
                <button class="intro-video-close" onclick="closeIntroVideo()">
                    <i data-feather="x" style="width: 24px; height: 24px;"></i>
                </button>
                <div class="intro-video-frame-wrap">
                    <iframe
                        class="intro-video-iframe"
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0"
                        title="Flora Yanma Atlası Tanıtım Videosu"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        `;

        // Modal dışına tıklandığında kapat
        introVideoModal.addEventListener('click', (e) => {
            if (e.target === introVideoModal) {
                closeIntroVideo();
            }
        });

        // ESC tuşu ile kapat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeIntroVideo();
            }
        });

        document.body.appendChild(introVideoModal);
    }

    // Video modalını aç
    window.openIntroVideo = function() {
        if (!introVideoModal) {
            createVideoModal();
        }

        introVideoModal.style.display = 'flex';
        isModalOpen = true;

        // Sayfa scroll'unu engelle
        document.body.style.overflow = 'hidden';

        // Feather ikonlarını güncelle
        if (window.feather) {
            setTimeout(() => feather.replace(), 100);
        }

        // Animasyon için küçük gecikme
        setTimeout(() => {
            introVideoModal.style.opacity = '1';
        }, 10);
    };

    // Video modalını kapat
    window.closeIntroVideo = function() {
        if (!introVideoModal || !isModalOpen) return;

        isModalOpen = false;
        introVideoModal.style.opacity = '0';

        // Sayfa scroll'unu geri aç
        document.body.style.overflow = '';

        setTimeout(() => {
            introVideoModal.style.display = 'none';

            // Video'yu durdur
            const iframe = introVideoModal.querySelector('.intro-video-iframe');
            if (iframe) {
                iframe.src = iframe.src; // Video'yu yeniden yükle (durdur)
            }
        }, 400);
    };

    // Tanıtım butonunu oluştur (eğer yoksa)
    function createIntroButton() {
        if (document.getElementById('intro-video-toggle')) {
            initMagneticEffect();
            return;
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'intro-video-toggle';

        const button = document.createElement('button');
        button.onclick = openIntroVideo;
        button.innerHTML = '🎥 Tanıtım Videosu İzle';
        button.title = 'Flora Yanma Atlası tanıtım videosunu izleyin';

        buttonContainer.appendChild(button);
        document.body.appendChild(buttonContainer);

        initMagneticEffect();
    }

    // Sayfa yüklendiğinde başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createIntroButton, { once: true });
    } else if (document.body) {
        createIntroButton();
    } else {
        window.addEventListener('load', createIntroButton, { once: true });
    }

})();
