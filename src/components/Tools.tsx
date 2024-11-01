import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTools } from '../store/toolSlice';

export function Tools({ navigation }) {
  const dispatch = useDispatch();
  const { tools, loading } = useSelector((state) => state.tools);
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  React.useEffect(() => {
    dispatch(fetchTools());
  }, [dispatch]);

  const categories = ['all', ...new Set(tools.map(tool => tool.category))];
  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        <label className="text-2xl font-bold mb-4" text="Tools Catalog" />
        
        {/* Category Filter */}
        <scrollView orientation="horizontal" className="mb-4">
          <stackLayout orientation="horizontal">
            {categories.map((category) => (
              <button
                key={category}
                className={`mr-2 p-2 rounded ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                text={category.charAt(0).toUpperCase() + category.slice(1)}
                onTap={() => setSelectedCategory(category)}
              />
            ))}
          </stackLayout>
        </scrollView>

        {loading ? (
          <activityIndicator busy={true} />
        ) : (
          <listView
            items={filteredTools}
            className="gap-2"
            itemTemplate={(tool) => (
              <gridLayout
                columns="auto,*,auto"
                className="p-4 bg-white rounded-lg"
              >
                <image
                  col="0"
                  src={tool.image_url}
                  className="w-16 h-16 rounded"
                />
                <stackLayout col="1" className="ml-4">
                  <label className="text-lg font-semibold" text={tool.name} />
                  <label className="text-gray-600" text={tool.description} />
                  <label className="text-blue-500" text={tool.category} />
                </stackLayout>
                {tool.purchase_url && (
                  <button
                    col="2"
                    className="bg-blue-500 text-white p-2 rounded"
                    text="Buy"
                    onTap={() => /* Handle purchase link */}
                  />
                )}
              </gridLayout>
            )}
          />
        )}
      </stackLayout>
    </scrollView>
  );
}