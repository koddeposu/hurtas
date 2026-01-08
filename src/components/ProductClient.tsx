"use client";
import { ProductCard } from "@/components/ProductCard";
import {
  DBCategory,
  DBProduct,
  SORT_OPTIONS,
  SortFilterProps,
  SortType,
} from "@/types/product";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, ChevronRight, Filter, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectGalleryModal } from "./ModalSliderImage";

interface ProductsClientProps {
  products: DBProduct[];
  categories: DBCategory[];
  activeCategory?: string; // category slug, undefined = all products
}

const HeroSection = () => (
  <section className="pt-32 pb-16 ">
    <div className="container mx-auto max-w-[1400px] relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="border-b border-slate-200 pb-10">
        <h1 className="text-[10px] font-black tracking-[0.4em] text-[#49202d] uppercase mb-4 block">
          Prefabrik Ev Modelleri
        </h1>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
          PROJE{" "}
          <span className="text-slate-300 italic font-serif">
            SEÇKİSİ . 2026
          </span>
        </h2>
      </div>
    </div>
  </section>
);

interface MobileFilterButtonProps {
  onClick: () => void;
  activeCategoryName?: string;
}

// Mobile Filter Button Component
const MobileFilterButton = ({
  onClick,
  activeCategoryName,
}: MobileFilterButtonProps) => (
  <div className="lg:hidden mb-6 flex items-center gap-3">
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg"
    >
      <Filter size={18} />
      Filtrele & Sırala
    </button>
    {activeCategoryName && (
      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
        {activeCategoryName}
      </span>
    )}
  </div>
);

interface CategoryFilterProps {
  activeSlug?: string; // current category slug, undefined = all
  categories: DBCategory[];
  onMobileClose?: () => void;
}

// Category Filter Component
const CategoryFilter = ({
  activeSlug,
  categories,
  onMobileClose,
}: CategoryFilterProps) => (
  <div>
    <div className="flex items-center gap-2 mb-8 text-[#49202d]">
      <Filter size={18} />
      <span className="font-black text-xs uppercase tracking-widest">
        Kategoriler
      </span>
    </div>
    <nav className="flex flex-col gap-2">
      {/* "Tümü" link - all products */}
      <Link
        href="/prefabrik-evler"
        onClick={onMobileClose}
        className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
          !activeSlug
            ? "bg-primary text-white shadow-lg shadow-[#49202d]/20"
            : "bg-transparent text-slate-400 hover:bg-slate-50"
        }`}
      >
        Tümü
        <ChevronRight
          size={16}
          className={!activeSlug ? "opacity-100" : "opacity-0"}
        />
      </Link>
      {/* Category links */}
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/prefabrik-evler/${cat.slug}`}
          onClick={onMobileClose}
          className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
            activeSlug === cat.slug
              ? "bg-primary text-white shadow-lg shadow-[#49202d]/20"
              : "bg-transparent text-slate-400 hover:bg-slate-50"
          }`}
        >
          {cat.name}
          <ChevronRight
            size={16}
            className={activeSlug === cat.slug ? "opacity-100" : "opacity-0"}
          />
        </Link>
      ))}
    </nav>
  </div>
);

// Sort Filter Component
const SortFilter = ({ sortBy, onSelect }: SortFilterProps) => (
  <div>
    <div className="flex items-center gap-2 mb-8 text-[#49202d]">
      <ArrowUpDown size={18} />
      <span className="font-black text-xs uppercase tracking-widest">
        Sıralama
      </span>
    </div>
    <nav className="flex flex-col gap-2">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option?.value)}
          className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
            sortBy === option.value
              ? "bg-primary text-white shadow-lg shadow-[#49202d]/20"
              : "bg-transparent text-slate-400 hover:bg-slate-50"
          }`}
        >
          {option.label}
          <ChevronRight
            size={16}
            className={sortBy === option.value ? "opacity-100" : "opacity-0"}
          />
        </button>
      ))}
    </nav>
  </div>
);

interface InfoCardProps {
  compact?: boolean;
}

const InfoCard = ({ compact = false }: InfoCardProps) => {
  const router = useRouter();
  const handle = () => router.push("/iletisim");
  return (
    <div
      onClick={handle}
      className={`bg-primary ${compact ? "p-6" : "p-8"} rounded-[2${compact ? "" : ".5"}rem] text-white relative overflow-hidden group cursor-pointer`}
    >
      <div className="relative z-10">
        <Info
          className={`${compact ? "mb-3" : "mb-4"} opacity-50`}
          size={compact ? 20 : 24}
        />
        <p
          className={`font-bold ${compact ? "text-xs" : "text-sm"} leading-relaxed`}
        >
          Aradığınız ölçüde bir proje bulamadınız mı? Size özel çizim
          yapabiliriz.
        </p>
        <button
          className={`${compact ? "mt-4 text-[9px]" : "mt-6 text-[10px]"} font-black uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all`}
        >
          Destek Al
        </button>
      </div>
      <div
        className={`absolute ${compact ? "-bottom-8 -right-8 w-24 h-24" : "-bottom-10 -right-10 w-32 h-32"} bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700`}
      />
    </div>
  );
};

interface DesktopSidebarProps {
  activeSlug?: string;
  sortBy: SortType;
  categories: DBCategory[];
  onSortSelect: (sort: SortType) => void;
}

// Desktop Sidebar Component
const DesktopSidebar = ({
  activeSlug,
  sortBy,
  categories,
  onSortSelect,
}: DesktopSidebarProps) => (
  <aside className="hidden lg:block w-full lg:w-1/4 space-y-8">
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <CategoryFilter activeSlug={activeSlug} categories={categories} />
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
  activeSlug?: string;
  sortBy: SortType;
  categories: DBCategory[];
  onSortSelect: (sort: SortType) => void;
}

// Mobile Filter Panel Component
const MobileFilterPanel = ({
  isOpen,
  onClose,
  activeSlug,
  sortBy,
  categories,
  onSortSelect,
}: MobileFilterPanelProps) => (
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
              <h2 className="text-xl font-black text-slate-900">
                Filtrele & Sırala
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <CategoryFilter
              activeSlug={activeSlug}
              categories={categories}
              onMobileClose={onClose}
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

// Main ProductsClient component
const ProductsClient = ({
  products,
  categories,
  activeCategory,
}: ProductsClientProps) => {
  const [sortBy, setSortBy] = useState<SortType>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DBProduct | null>(
    null,
  );

  // Get active category name for display
  const activeCategoryName = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name
    : undefined;

  const getSortedProducts = () => {
    // Products are already filtered by category on the server side
    let sorted = [...products];

    if (sortBy === "price-asc") {
      sorted = sorted.sort((a, b) => {
        const priceA = !a.price || a.price === "null" ? 0 : Number(a.price);
        const priceB = !b.price || b.price === "null" ? 0 : Number(b.price);
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      sorted = sorted.sort((a, b) => {
        const priceA = !a.price || a.price === "null" ? 0 : Number(a.price);
        const priceB = !b.price || b.price === "null" ? 0 : Number(b.price);
        return priceB - priceA;
      });
    }
    return sorted;
  };

  return (
    <div className="max-w-[1280px] w-full">
      <ProjectGalleryModal
        projects={
          selectedProduct
            ? selectedProduct.images.map((image, i) => ({
                id: i,
                img: image.url,
                title: image.alt,
              }))
            : []
        }
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <HeroSection />

      <section className=" max-w-[1400px] pb-20">
        <MobileFilterButton
          onClick={() => setIsFilterOpen(true)}
          activeCategoryName={activeCategoryName}
        />

        <div className="flex flex-col lg:flex-row gap-12">
          <DesktopSidebar
            activeSlug={activeCategory}
            sortBy={sortBy}
            categories={categories}
            onSortSelect={(sort: SortType) => setSortBy(sort)}
          />

          <div className="flex-1">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] border border-slate-100">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Filter size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Ürün Bulunamadı
                </h3>
                <p className="text-slate-500 text-center max-w-md mb-6">
                  {activeCategoryName
                    ? `"${activeCategoryName}" kategorisinde henüz ürün bulunmuyor.`
                    : "Henüz ürün eklenmemiş."}
                </p>
                <Link
                  href="/prefabrik-evler"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition"
                >
                  Tüm Ürünleri Gör
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {getSortedProducts().map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      fullscreenChange={() => setSelectedProduct(product)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      <MobileFilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeSlug={activeCategory}
        sortBy={sortBy}
        categories={categories}
        onSortSelect={setSortBy}
      />
    </div>
  );
};

export default ProductsClient;
