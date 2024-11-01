import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/categorySlice';

export function Categories({ navigation }) {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigation.navigate('CategoryRepairs', { categoryId: category.id });
  };

  if (loading) {
    return (
      <gridLayout className="p-4">
        <activityIndicator busy={true} />
      </gridLayout>
    );
  }

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        <gridLayout columns="*,*" className="gap-2">
          {categories.map((category) => (
            <stackLayout
              key={category.id}
              className={`p-4 bg-white rounded-lg ${
                selectedCategory?.id === category.id ? 'border-2 border-blue-500' : ''
              }`}
              onTap={() => handleCategorySelect(category)}
            >
              <image
                src={category.icon_url}
                className="w-16 h-16 mb-2 self-center"
              />
              <label
                className="text-center font-semibold"
                text={category.name}
              />
              <label
                className="text-center text-gray-500 text-sm"
                text={`${category.repair_count} repairs`}
              />
            </stackLayout>
          ))}
        </gridLayout>
      </stackLayout>
    </scrollView>
  );
}