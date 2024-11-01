import * as React from "react";
import { useSelector } from 'react-redux';
import { supabase } from '../services/supabase';

export function RepairNotes({ repairId }) {
  const { user } = useSelector((state) => state.user);
  const [notes, setNotes] = React.useState([]);
  const [newNote, setNewNote] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user, repairId]);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('repair_notes')
        .select('*')
        .eq('repair_id', repairId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const { error } = await supabase
        .from('repair_notes')
        .insert({
          user_id: user.id,
          repair_id: repairId,
          content: newNote.trim()
        });

      if (error) throw error;
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (!user) return null;

  return (
    <stackLayout className="bg-white p-4 rounded-lg">
      <label className="text-xl font-bold mb-2" text="Your Notes" />
      
      <gridLayout columns="*,auto" className="mb-4">
        <textField
          col="0"
          text={newNote}
          hint="Add a note..."
          onTextChange={(e) => setNewNote(e.value)}
          className="border-b border-gray-300 mr-2"
        />
        <button
          col="1"
          text="Add"
          className="bg-blue-500 text-white p-2 rounded"
          onTap={addNote}
        />
      </gridLayout>

      {loading ? (
        <activityIndicator busy={true} />
      ) : (
        <listView
          items={notes}
          className="gap-2"
          itemTemplate={(note) => (
            <stackLayout className="p-2 border-l-4 border-blue-500">
              <label text={note.content} textWrap={true} className="text-gray-700" />
              <label text={new Date(note.created_at).toLocaleDateString()} className="text-gray-500 text-sm" />
            </stackLayout>
          )}
        />
      )}
    </stackLayout>
  );
}