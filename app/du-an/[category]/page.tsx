import CategoryProjectsClient from './CategoryProjectsClient';

// Sửa đúng slug cho tất cả danh mục
const categoryMap: Record<string, string> = {
  'bac-ai-xa-hoi': 'Bác ái xã hội',
  'ho-tro-y-te-va-suc-khoe': 'Hỗ trợ y tế và sức khoẻ',
  'ho-tro-phat-trien-giao-duc': 'Hỗ trợ phát triển giáo dục',
};

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    category,
  }));
}

export default function CategoryProjectsPage() {
  return <CategoryProjectsClient />;
}