import * as React from "react";
import { useSelector } from 'react-redux';
import { supabase } from '../services/supabase';

export function CategoryRepairs({ route, navigation }) {
  const [repairs, setRepairs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const categoryId = route.params.categoryId;

  React.useEffect(() => {
    fetchCategoryRepairs();
  }, [categoryId]);

  const fetchCategoryRepairs = async () => {
    try {
      const { data, error } = await supabase
        .from('repairs')
        .select('*')
        .eq('category_id', categoryId);

      if (error) throw error;
      setRepairs(data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        {loading ? (
          <activityIndicator busy={true} />
        ) : (
          <listView
            items={repairs}
            className="gap-2"
            itemTemplate={(repair) => (
              <stackLayout
                className="p-4 bg-white rounded-lg"
                onTap={() => navigation.navigate('RepairDetails', { repairId: repair.id })}
              >
                <label className="text-lg font-semibold" text={repair.title} />
                <label className="text-gray-600" text={repair.description} />
                <gridLayout columns="auto,*" className="mt-2">
                  <label col="0" className="text-blue-500" text={`${repair.difficulty} • `} />
                  <label col="1" className="text-blue-500" text={`${repair.estimated_time} min`} />
                </gridLayout>
              </stackLayout>
            )}
          />
        )}
      </stackLayout>
    </scrollView>
  );
}