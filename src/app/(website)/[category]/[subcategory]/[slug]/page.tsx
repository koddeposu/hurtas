import ProductPage, {
  generateMetadata as generateProductMetadata,
} from "@/app/(website)/urun-detay/[slug]/page";

type Props = {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
};

function getProductParams(params: Props["params"]) {
  return params.then(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  return generateProductMetadata({ params: getProductParams(params) });
}

export default async function SubcategoryProductPage({ params }: Props) {
  return ProductPage({ params: getProductParams(params) });
}
