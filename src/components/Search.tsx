import * as React from "react";
import { useSelector } from 'react-redux';
import { supabase } from '../services/supabase';

export function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState({
    difficulty: null,
    maxTime: null,
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      let query = supabase
        .from('repairs')
        .select('*')
        .ilike('title', `%${searchQuery}%`);

      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      if (filters.maxTime) {
        query = query.lte('estimated_time', filters.maxTime);
      }

      const { data, error } = await query;
      if (error) throw error;
      setSearchResults(data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <stackLayout className="bg-gray-100">
      <stackLayout className="p-4">
        <searchBar
          text={searchQuery}
          hint="Search repairs..."
          onTextChange={(e) => setSearchQuery(e.value)}
          onSubmit={handleSearch}
          className="mb-4"
        />

        {/* Filters */}
        <gridLayout columns="*,*" className="mb-4 gap-2">
          <dropDown
            col="0"
            items={['Easy', 'Medium', 'Hard']}
            hint="Difficulty"
            selectedIndex={-1}
            onSelectedIndexChanged={(e) => 
              setFilters({ ...filters, difficulty: e.value })}
          />
          <dropDown
            col="1"
            items={['30', '60', '90', '120']}
            hint="Max Time (min)"
            selectedIndex={-1}
            onSelectedIndexChanged={(e) => 
              setFilters({ ...filters, maxTime: parseInt(e.value) })}
          />
        </gridLayout>

        {loading ? (
          <activityIndicator busy={true} />
        ) : (
          <listView
            items={searchResults}
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
    </stackLayout>
  );
}