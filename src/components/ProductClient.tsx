"use client";
import { ProductCard } from '@/components/ProductCard';
import { CATEGORIES, Category, MOCK_PRODUCT, ProductGridProps, SORT_OPTIONS, SortFilterProps, SortType } from '@/types/product';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, ChevronRight, Filter, Info, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const HeroSection = () => (
  <section className="pt-32 pb-16 ">
    <div className="container mx-auto max-w-[1400px] relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#49202d]/5 rounded-full blur-3xl -z-10" />
      <div className="border-b border-slate-200 pb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black tracking-[0.4em] text-[#49202d] uppercase mb-4 block"
        >
          Üretim Kataloğu 2025
        </motion.span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
          PROJE <span className="text-slate-300 italic font-serif">SEÇKİSİ.</span>
        </h1>
      </div>
    </div>
  </section>
);

interface MobileFilterButtonProps {
  onClick: () => void;
  activeTab: Category;
}

// Mobile Filter Button Component
const MobileFilterButton = ({ onClick, activeTab }: MobileFilterButtonProps) => (
  <div className="lg:hidden mb-6 flex items-center gap-3">
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-4 bg-[#49202d] text-white rounded-2xl font-bold text-sm shadow-lg"
    >
      <Filter size={18} />
      Filtrele & Sırala
    </button>
    {activeTab !== "Tümü" && (
      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
        {activeTab}
      </span>
    )}
  </div>
);

interface CategoryFilterProps {
  activeTab: Category;
  onSelect: (category: Category) => void;
  isMobile?: boolean;
}

// Category Filter Component
const CategoryFilter = ({ activeTab, onSelect, isMobile = false }: CategoryFilterProps) => (
  <div>
    <div className="flex items-center gap-2 mb-8 text-[#49202d]">
      <Filter size={18} />
      <span className="font-black text-xs uppercase tracking-widest">Kategoriler</span>
    </div>
    <nav className="flex flex-col gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all text-sm ${activeTab === cat
            ? "bg-[#49202d] text-white shadow-lg shadow-[#49202d]/20"
            : "bg-transparent text-slate-400 hover:bg-slate-50"
            }`}
        >
          {cat}
          <ChevronRight size={16} className={activeTab === cat ? "opacity-100" : "opacity-0"} />
        </button>
      ))}
    </nav>
  </div>
);




// Sort Filter Component
const SortFilter = ({ sortBy, onSelect }: SortFilterProps) => (
  <div>
    <div className="flex items-center gap-2 mb-8 text-[#49202d]">
      <ArrowUpDown size={18} />
      <span className="font-black text-xs uppercase tracking-widest">Sıralama</span>
    </div>
    <nav className="flex flex-col gap-2">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option?.value)}
          className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all text-sm ${sortBy === option.value
            ? "bg-[#49202d] text-white shadow-lg shadow-[#49202d]/20"
            : "bg-transparent text-slate-400 hover:bg-slate-50"
            }`}
        >
          {option.label}
          <ChevronRight size={16} className={sortBy === option.value ? "opacity-100" : "opacity-0"} />
        </button>
      ))}
    </nav>
  </div>
);

interface InfoCardProps {
  compact?: boolean;
}

const InfoCard = ({ compact = false }: InfoCardProps) => {
  const router = useRouter()
  const handle = () => router.push("/iletisim")
  return (
    <div onClick={handle} className={`bg-[#49202d] ${compact ? 'p-6' : 'p-8'} rounded-[2${compact ? '' : '.5'}rem] text-white relative overflow-hidden group cursor-pointer`}>
      <div className="relative z-10">
        <Info className={`${compact ? 'mb-3' : 'mb-4'} opacity-50`} size={compact ? 20 : 24} />
        <p className={`font-bold ${compact ? 'text-xs' : 'text-sm'} leading-relaxed`}>
          Aradığınız ölçüde bir proje bulamadınız mı? Size özel çizim yapabiliriz.
        </p>
        <button className={`${compact ? 'mt-4 text-[9px]' : 'mt-6 text-[10px]'} font-black uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all`}>
          Destek Al
        </button>
      </div>
      <div className={`absolute ${compact ? '-bottom-8 -right-8 w-24 h-24' : '-bottom-10 -right-10 w-32 h-32'} bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700`} />
    </div>
  )
}

interface DesktopSidebarProps {
  activeTab: Category;
  sortBy: SortType;
  onCategorySelect: (category: Category) => void;
  onSortSelect: (sort: SortType) => void;
}

// Desktop Sidebar Component
const DesktopSidebar = ({ activeTab, sortBy, onCategorySelect, onSortSelect }: DesktopSidebarProps) => (
  <aside className="hidden lg:block w-full lg:w-1/4 space-y-8">
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <CategoryFilter activeTab={activeTab} onSelect={onCategorySelect} />
    </div>

    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <SortFilter sortBy={sortBy} onSelect={onSortSelect} />
    </div>

    <InfoCard />
  </aside>
);

interface MobileFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Category;
  sortBy: SortType;
  onCategorySelect: (category: Category) => void;
  onSortSelect: (sort: SortType) => void;
}

// Mobile Filter Panel Component
const MobileFilterPanel = ({ isOpen, onClose, activeTab, sortBy, onCategorySelect, onSortSelect }: MobileFilterPanelProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-xl font-black text-slate-900">Filtrele & Sırala</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <CategoryFilter
              activeTab={activeTab}
              onSelect={(cat) => {
                onCategorySelect(cat);
                onClose();
              }}
              isMobile
            />

            <SortFilter
              sortBy={sortBy}
              onSelect={(sort) => {
                onSortSelect(sort);
                onClose();
              }}
            />

            <InfoCard compact />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);




// Product Grid Component
const ProductGrid = ({ products }: ProductGridProps) => (
  <div className="flex-1">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence mode='popLayout'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  </div>
);


// ... (HeroSection, MobileFilterButton, CategoryFilter, SortFilter, InfoCard, DesktopSidebar, MobileFilterPanel, ProductGrid bileşenleri aynı kalıyor, dokunmanıza gerek yok) ...

// 1. Mantığı içeren yeni bir alt bileşen oluşturuyoruz
const ProductsClient = () => {
  const searchParams = useSearchParams();
  const kategoriFromURL = searchParams.get('kategori');

  const [activeTab, setActiveTab] = useState<Category>("Tümü");
  const [sortBy, setSortBy] = useState<SortType>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (kategoriFromURL) {
      const validCategory = CATEGORIES.find(cat => cat === kategoriFromURL);
      if (validCategory) {
        setActiveTab(validCategory as Category);
      }
    }
  }, [kategoriFromURL]);

  const getFilteredAndSortedProducts = () => {
    let filtered = MOCK_PRODUCT.filter(p => activeTab === "Tümü" || p.category === activeTab);

    if (sortBy === "price-asc") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.price === "null" ? 0 : Number(a.price);
        const priceB = b.price === "null" ? 0 : Number(b.price);
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.price === "null" ? 0 : Number(a.price);
        const priceB = b.price === "null" ? 0 : Number(b.price);
        return priceB - priceA;
      });
    }
    return filtered;
  };

  return (
    <main className='max-w-[1280px] w-full'>
      <HeroSection />

      <section className=" max-w-[1400px] pb-20">
        <MobileFilterButton
          onClick={() => setIsFilterOpen(true)}
          activeTab={activeTab}
        />

        <div className="flex flex-col lg:flex-row gap-12">
          <DesktopSidebar
            activeTab={activeTab}
            sortBy={sortBy}
            onCategorySelect={(cat: Category) => setActiveTab(cat)}
            onSortSelect={(sort: SortType) => setSortBy(sort)}
          />

          <ProductGrid products={getFilteredAndSortedProducts()} />
        </div>
      </section>

      <MobileFilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeTab={activeTab}
        sortBy={sortBy}
        onCategorySelect={setActiveTab}
        onSortSelect={setSortBy}
      />
    </main>
  );
};

export default ProductsClient;
