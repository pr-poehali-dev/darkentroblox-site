import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Section = "home" | "catalog" | "about" | "reviews" | "account";

const CATEGORIES = ["Все", "Социальные сети", "Стриминг", "Игры", "Email", "VPN"];

const ACCOUNTS = [
  { id: 1, title: "Instagram • Прокаченный", category: "Социальные сети", price: 2500, oldPrice: 3200, followers: "12K подписчиков", verified: true, hot: true, rating: 4.9, reviews: 142, tag: "ХИТ" },
  { id: 2, title: "Spotify Premium", category: "Стриминг", price: 890, oldPrice: null, followers: "12 месяцев", verified: true, hot: false, rating: 5.0, reviews: 89, tag: "НОВИНКА" },
  { id: 3, title: "Steam • Высокий уровень", category: "Игры", price: 4200, oldPrice: 5000, followers: "Уровень 42", verified: true, hot: true, rating: 4.8, reviews: 67, tag: "ХИТ" },
  { id: 4, title: "Netflix Premium", category: "Стриминг", price: 1200, oldPrice: null, followers: "4K Ultra HD", verified: true, hot: false, rating: 4.7, reviews: 203, tag: null },
  { id: 5, title: "TikTok • Монетизация", category: "Социальные сети", price: 8900, oldPrice: 11000, followers: "50K подписчиков", verified: true, hot: true, rating: 4.9, reviews: 31, tag: "ЭКСКЛЮЗИВ" },
  { id: 6, title: "Gmail • Старый аккаунт", category: "Email", price: 650, oldPrice: null, followers: "Создан в 2015", verified: true, hot: false, rating: 4.6, reviews: 178, tag: null },
  { id: 7, title: "Roblox • @MaksMark_1", category: "Игры", price: 3500, oldPrice: null, followers: "Донатный уровень • 2023", verified: true, hot: false, rating: 4.8, reviews: 12, tag: "НОВИНКА" },
  { id: 8, title: "Roblox • @Wowisnice62526", category: "Игры", price: 199, oldPrice: null, followers: "Донатный уровень • 2023", verified: true, hot: false, rating: 4.8, reviews: 0, tag: "НОВИНКА" },
];

const REVIEWS = [
  { id: 1, name: "Александр К.", date: "18 апреля 2026", rating: 5, text: "Отличный сервис. Аккаунт пришёл мгновенно, всё работает как заявлено. Уже третья покупка здесь.", product: "Instagram • Прокаченный" },
  { id: 2, name: "Мария Д.", date: "15 апреля 2026", rating: 5, text: "Первый раз покупала здесь — очень довольна. Поддержка быстро ответила на все вопросы. Рекомендую.", product: "Spotify Premium" },
  { id: 3, name: "Дмитрий Л.", date: "10 апреля 2026", rating: 5, text: "Приобрёл Steam аккаунт. Полное соответствие описанию. Быстро, профессионально, без лишних вопросов.", product: "Steam • Высокий уровень" },
  { id: 4, name: "Елена В.", date: "5 апреля 2026", rating: 4, text: "Всё хорошо, аккаунт работает. Немного дольше ждала ответа поддержки, но в итоге всё решили.", product: "Netflix Premium" },
];

const STATS = [
  { value: "15 000+", label: "Успешных сделок" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "2 года", label: "На рынке" },
  { value: "24/7", label: "Поддержка" },
];

const GUARANTEES = [
  { icon: "ShieldCheck", title: "Гарантия замены", desc: "Заменим аккаунт в течение 72 часов при любых проблемах" },
  { icon: "Lock", title: "Безопасная оплата", desc: "Все транзакции защищены. Принимаем карты, СБП и крипту" },
  { icon: "Zap", title: "Мгновенная доставка", desc: "Данные аккаунта поступают сразу после подтверждения оплаты" },
  { icon: "UserCheck", title: "Проверенные аккаунты", desc: "Каждый аккаунт проходит многоступенчатую проверку перед продажей" },
];

const PURCHASES = [
  { id: 1, title: "Instagram • Прокаченный", date: "18 апреля 2026", price: 2500, status: "Доставлен" },
  { id: 2, title: "Spotify Premium", date: "3 марта 2026", price: 890, status: "Доставлен" },
];

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [notifOpen, setNotifOpen] = useState(false);

  const filtered = ACCOUNTS.filter((a) => {
    const matchCat = activeCategory === "Все" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const hot = ACCOUNTS.filter((a) => a.hot).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button onClick={() => setSection("home")} className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 gold-bg rounded flex items-center justify-center">
              <Icon name="Store" size={16} className="text-background" />
            </div>
            <span className="font-display text-xl font-bold gold-text tracking-wide hidden sm:block">AccountMarket</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {(["home", "catalog", "about", "reviews"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${section === s ? "gold-text" : "text-muted-foreground hover:text-foreground"}`}
              >
                {{ home: "Главная", catalog: "Каталог", about: "О магазине", reviews: "Отзывы" }[s]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Input
                placeholder="Поиск..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); if (section !== "catalog") setSection("catalog"); }}
                className="w-48 h-9 bg-secondary border-border text-sm pl-8"
              />
              <Icon name="Search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded border border-border hover:border-primary transition-colors"
            >
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full gold-bg" />
            </button>

            <button
              onClick={() => setSection("account")}
              className={`w-9 h-9 flex items-center justify-center rounded border transition-colors ${section === "account" ? "border-primary gold-text" : "border-border hover:border-primary text-muted-foreground hover:text-foreground"}`}
            >
              <Icon name="User" size={16} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex border-t border-border overflow-x-auto">
          {(["home", "catalog", "about", "reviews"] as Section[]).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex-1 py-2 text-xs font-medium whitespace-nowrap px-2 transition-colors ${section === s ? "gold-text border-b-2 gold-border" : "text-muted-foreground"}`}
            >
              {{ home: "Главная", catalog: "Каталог", about: "О магазине", reviews: "Отзывы" }[s]}
            </button>
          ))}
        </div>
      </header>

      {/* NOTIFICATION DROPDOWN */}
      {notifOpen && (
        <div className="fixed top-20 right-4 z-50 w-80 bg-card border border-border rounded-lg shadow-2xl animate-fade-in">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-sm">Уведомления</span>
            <button onClick={() => setNotifOpen(false)}><Icon name="X" size={14} className="text-muted-foreground" /></button>
          </div>
          <div className="p-3 space-y-2">
            {[
              { icon: "Tag", text: "Скидка 20% на Steam аккаунты до конца недели", time: "2 ч назад" },
              { icon: "Package", text: "Новые TikTok аккаунты с монетизацией", time: "1 день назад" },
              { icon: "Star", text: "Специальное предложение для постоянных клиентов", time: "3 дня назад" },
            ].map((n, i) => (
              <div key={i} className="flex gap-3 p-2 rounded hover:bg-secondary transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded gold-bg/10 flex items-center justify-center shrink-0">
                  <Icon name={n.icon} fallback="Bell" size={14} className="gold-text" />
                </div>
                <div>
                  <p className="text-xs text-foreground leading-tight">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* ====== HOME ====== */}
        {section === "home" && (
          <div className="animate-fade-in">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
                <div className="w-full h-full" style={{ background: "radial-gradient(circle at 80% 50%, hsl(43,74%,55%), transparent 60%)" }} />
              </div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest gold-text mb-6 border border-primary/30 rounded px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full gold-bg animate-pulse" />
                    Проверенный магазин аккаунтов
                  </div>
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ color: "hsl(40,20%,92%)" }}>
                    Цифровые<br />
                    <span className="gold-text">аккаунты</span><br />
                    премиум-класса
                  </h1>
                  <div className="inline-flex items-center gap-2 text-sm font-medium mb-6 bg-card border border-border rounded px-4 py-2.5">
                    <Icon name="Send" size={15} className="gold-text shrink-0" />
                    <span className="text-muted-foreground">Покупка аккаунта — пишите сюда:</span>
                    <a href="https://t.me/akkrbst_bot" target="_blank" rel="noopener noreferrer" className="gold-text font-semibold hover:underline">@akkrbst_bot</a>
                    <span className="text-xs text-muted-foreground">— отвечает реальный человек!</span>
                  </div>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
                    Проверенные аккаунты социальных сетей, стриминга и игровых платформ. Гарантия качества, мгновенная доставка.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setSection("catalog")} className="h-12 px-8 gold-bg text-background font-semibold text-sm hover:opacity-90 transition-opacity rounded-sm">
                      Перейти в каталог
                    </Button>
                    <Button onClick={() => setSection("about")} variant="outline" className="h-12 px-8 border-border text-foreground hover:bg-secondary rounded-sm text-sm">
                      О гарантиях
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="border-b border-border bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
                  {STATS.map((s) => (
                    <div key={s.label} className="py-6 px-6 text-center">
                      <div className="font-display text-3xl font-bold gold-text mb-1">{s.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* HOT OFFERS */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Лучшие предложения</div>
                  <h2 className="text-2xl font-bold">Актуальные предложения</h2>
                </div>
                <button onClick={() => setSection("catalog")} className="text-sm gold-text hover:underline flex items-center gap-1">
                  Все товары <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hot.map((acc) => (
                  <AccountCard key={acc.id} acc={acc} />
                ))}
              </div>
            </section>

            {/* GUARANTEES */}
            <section className="py-16 border-t border-border bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Надёжность</div>
                  <h2 className="text-2xl font-bold">Почему выбирают нас</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {GUARANTEES.map((g) => (
                    <div key={g.title} className="p-5 rounded-sm bg-background border border-border hover-lift">
                      <div className="w-10 h-10 rounded gold-bg/10 flex items-center justify-center mb-4">
                        <Icon name={g.icon} fallback="ShieldCheck" size={20} className="gold-text" />
                      </div>
                      <h3 className="font-semibold text-sm mb-2">{g.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* RECENT REVIEWS */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Репутация</div>
                  <h2 className="text-2xl font-bold">Что говорят клиенты</h2>
                </div>
                <button onClick={() => setSection("reviews")} className="text-sm gold-text hover:underline flex items-center gap-1">
                  Все отзывы <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REVIEWS.slice(0, 2).map((r) => (
                  <ReviewCard key={r.id} r={r} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====== CATALOG ====== */}
        {section === "catalog" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Магазин</div>
              <h1 className="text-2xl font-bold">Каталог аккаунтов</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Input
                  placeholder="Поиск по каталогу..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-card border-border pl-9 h-10"
                />
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-sm border border-border bg-card text-sm px-3 text-foreground min-w-40"
              >
                <option value="popular">По популярности</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap mb-8">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm border transition-colors ${activeCategory === c ? "gold-bg text-background border-transparent" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="text-xs text-muted-foreground mb-4">{filtered.length} товаров</div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
                <p>Ничего не найдено</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((acc) => (
                  <AccountCard key={acc.id} acc={acc} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====== ABOUT ====== */}
        {section === "about" && (
          <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-10">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">О нас</div>
              <h1 className="text-2xl font-bold">О магазине и гарантиях</h1>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-card border border-border rounded-sm">
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Building2" size={16} className="gold-text" />
                  О компании
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AccountMarket — профессиональный магазин цифровых аккаунтов, работающий с 2022 года. Мы специализируемся на продаже проверенных аккаунтов социальных сетей, стриминговых платформ и игровых сервисов. За два года работы мы провели более 15 000 успешных сделок и завоевали репутацию надёжного партнёра в нашей нише.
                </p>
              </div>

              {GUARANTEES.map((g) => (
                <div key={g.title} className="p-6 bg-card border border-border rounded-sm flex gap-4">
                  <div className="w-10 h-10 rounded gold-bg/10 flex items-center justify-center shrink-0">
                    <Icon name={g.icon} fallback="ShieldCheck" size={20} className="gold-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{g.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}

              <div className="p-6 bg-card border border-primary/30 rounded-sm">
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="FileText" size={16} className="gold-text" />
                  Условия гарантии
                </h2>
                <ul className="space-y-2">
                  {[
                    "Гарантийный период — 72 часа с момента передачи данных",
                    "Бесплатная замена при смене пароля прежним владельцем",
                    "Возврат средств при невозможности предоставить замену",
                    "Поддержка 24/7 через чат и Telegram",
                    "Оспаривание транзакций через платёжную систему",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="CheckCircle" size={14} className="gold-text mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ====== REVIEWS ====== */}
        {section === "reviews" && (
          <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Репутация</div>
              <h1 className="text-2xl font-bold">Отзывы покупателей</h1>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Средний рейтинг", value: "4.95 / 5" },
                { label: "Всего отзывов", value: "483" },
                { label: "Рекомендуют", value: "99%" },
              ].map((s) => (
                <div key={s.label} className="p-4 bg-card border border-border rounded-sm text-center">
                  <div className="font-display text-2xl font-bold gold-text mb-0.5">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {REVIEWS.map((r) => (
                <ReviewCard key={r.id} r={r} />
              ))}
            </div>

            <div className="mt-8 p-6 bg-card border border-border rounded-sm">
              <h3 className="font-semibold text-sm mb-4">Оставить отзыв</h3>
              <div className="flex gap-2 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <button key={star}>
                    <Icon name="Star" size={20} className="gold-text fill-current" />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Расскажите о вашем опыте покупки..."
                className="w-full bg-background border border-border rounded-sm p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:border-primary"
              />
              <Button className="mt-3 h-9 px-5 gold-bg text-background text-sm font-semibold hover:opacity-90 rounded-sm">
                Отправить отзыв
              </Button>
            </div>
          </div>
        )}

        {/* ====== ACCOUNT ====== */}
        {section === "account" && (
          <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Профиль</div>
              <h1 className="text-2xl font-bold">Личный кабинет</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-1 p-6 bg-card border border-border rounded-sm text-center">
                <div className="w-16 h-16 rounded-full gold-bg/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={28} className="gold-text" />
                </div>
                <div className="font-semibold mb-4">@user</div>
                <div className="text-xs text-muted-foreground border-t border-border pt-4 mt-2">
                  <div className="flex justify-between mb-1"><span>Покупок</span><span className="text-foreground font-medium">2</span></div>
                  <div className="flex justify-between mb-1"><span>Потрачено</span><span className="text-foreground font-medium">3 390 ₽</span></div>
                  <div className="flex justify-between"><span>Статус</span><span className="gold-text font-medium">Постоянный</span></div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="p-5 bg-card border border-border rounded-sm">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Icon name="Bell" size={14} className="gold-text" />
                    Уведомления
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Email-уведомления о заказах", on: true },
                      { label: "Уведомления о скидках", on: true },
                      { label: "Новые поступления", on: false },
                    ].map((n) => (
                      <div key={n.label} className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{n.label}</span>
                        <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${n.on ? "gold-bg" : "bg-secondary"}`}>
                          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-background transition-transform ${n.on ? "translate-x-4" : "translate-x-0.5"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-card border border-border rounded-sm">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Icon name="Settings" size={14} className="gold-text" />
                Данные профиля
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Telegram</label>
                  <Input placeholder="@username" className="bg-background border-border h-9 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" className="bg-background border-border h-9 text-sm" />
                </div>
              </div>
              <Button className="mt-4 h-9 px-5 gold-bg text-background text-sm font-semibold hover:opacity-90 rounded-sm">
                Сохранить изменения
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gold-bg rounded flex items-center justify-center">
                <Icon name="Store" size={12} className="text-background" />
              </div>
              <span className="font-display text-base font-bold gold-text">AccountMarket</span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Публичная оферта</button>
              <button className="hover:text-foreground transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-foreground transition-colors">Контакты</button>
            </div>
            <div className="text-xs text-muted-foreground">© 2026 AccountMarket</div>
          </div>
        </div>
      </footer>

      {/* CHAT */}
      {chatOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-card border border-border rounded-lg shadow-2xl z-50 animate-slide-up flex flex-col" style={{ height: 380 }}>
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gold-bg/20 rounded-full flex items-center justify-center">
                <Icon name="Headphones" size={12} className="gold-text" />
              </div>
              <span className="text-sm font-medium">Поддержка</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            <button onClick={() => setChatOpen(false)}><Icon name="X" size={14} className="text-muted-foreground" /></button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 gold-bg/20 rounded-full flex items-center justify-center shrink-0">
                <Icon name="Bot" size={12} className="gold-text" />
              </div>
              <div className="bg-secondary rounded-lg rounded-tl-none px-3 py-2 text-xs text-foreground max-w-56">
                Здравствуйте! Готов помочь с любым вопросом по покупке аккаунтов.
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              placeholder="Ваш вопрос..."
              className="bg-background border-border text-xs h-8"
              onKeyDown={(e) => e.key === "Enter" && setChatMsg("")}
            />
            <button
              onClick={() => setChatMsg("")}
              className="w-8 h-8 gold-bg rounded flex items-center justify-center shrink-0 hover:opacity-90"
            >
              <Icon name="Send" size={12} className="text-background" />
            </button>
          </div>
        </div>
      )}

      {/* CHAT BUTTON */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 w-12 h-12 gold-bg rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity z-40"
      >
        <Icon name={chatOpen ? "X" : "MessageCircle"} size={20} className="text-background" />
      </button>
    </div>
  );
}

function AccountCard({ acc }: { acc: typeof ACCOUNTS[0] }) {
  return (
    <div className="bg-card border border-border rounded-sm p-5 hover-lift relative overflow-hidden group cursor-pointer">
      {acc.tag && (
        <span className={`tag-badge absolute top-3 right-3 ${acc.tag === "ХИТ" ? "bg-primary/10 gold-text" : acc.tag === "ЭКСКЛЮЗИВ" ? "bg-purple-500/10 text-purple-400" : "bg-green-500/10 text-green-400"}`}>
          {acc.tag}
        </span>
      )}
      <div className="w-10 h-10 rounded gold-bg/10 flex items-center justify-center mb-3">
        <Icon name={acc.category === "Игры" ? "Gamepad2" : acc.category === "Стриминг" ? "Play" : acc.category === "Email" ? "Mail" : acc.category === "VPN" ? "Shield" : "Users"} size={20} className="gold-text" />
      </div>
      <h3 className="font-semibold text-sm mb-1">{acc.title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{acc.followers}</p>
      <div className="flex items-center gap-1 mb-4">
        <Icon name="Star" size={12} className="gold-text fill-current" />
        <span className="text-xs font-medium">{acc.rating}</span>
        <span className="text-xs text-muted-foreground">({acc.reviews})</span>
        {acc.verified && <Icon name="BadgeCheck" size={12} className="gold-text ml-auto" />}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-bold">{acc.price.toLocaleString("ru")} ₽</div>
          {acc.oldPrice && <div className="text-xs text-muted-foreground line-through">{acc.oldPrice.toLocaleString("ru")} ₽</div>}
        </div>
        <button className="h-8 px-4 gold-bg text-background text-xs font-semibold rounded-sm hover:opacity-90 transition-opacity">
          Купить
        </button>
      </div>
    </div>
  );
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <div className="bg-card border border-border rounded-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gold-bg/20 flex items-center justify-center">
            <Icon name="User" size={14} className="gold-text" />
          </div>
          <div>
            <div className="text-sm font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.date}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Icon key={i} name="Star" size={12} className="gold-text fill-current" />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{r.text}</p>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-2 flex items-center gap-1">
        <Icon name="Package" size={10} className="gold-text" />
        {r.product}
      </div>
    </div>
  );
}