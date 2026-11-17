import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, Play, Trash2, Calendar, FileVideo } from 'lucide-react';
import type { VideoItem } from '@/types';

export function Videos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function loadVideos() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('user_id', auth.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    const result = await Promise.all((data || []).map(async (row: any) => {
      let url = '';
      if (row.storage_path) {
        const { data: signed } = await supabase.storage
          .from('videos')
          .createSignedUrl(row.storage_path, 3600);
        url = signed?.signedUrl || '';
      }

      return {
        id: row.id,
        title: row.title,
        status: row.status,
        thumbnail: row.thumbnail || '',
        views: row.views || 0,
        likes: row.likes || 0,
        comments: row.comments || 0,
        shares: row.shares || 0,
        publishedAt: row.published_at || null,
        scheduledFor: row.scheduled_for || null,
        duration: row.duration || '',
        storagePath: row.storage_path,
        fileName: row.file_name,
        videoUrl: url
      } as VideoItem;
    }));

    setVideos(result);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function uploadVideo() {
    if (!file || !title.trim()) {
      setMessage('Choose a video and enter its title.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setMessage('Please sign in first.');
      setLoading(false);
      return;
    }

    const path = `${auth.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      setMessage(uploadError.message);
      setLoading(false);
      return;
    }

    const futureDate = date && new Date(date).getTime() > Date.now();

    const { error } = await supabase.from('videos').insert({
      user_id: auth.user.id,
      title: title.trim(),
      status: futureDate ? 'scheduled' : 'draft',
      scheduled_for: futureDate ? new Date(date).toISOString() : null,
      storage_path: path,
      file_name: file.name
    });

    if (error) {
      await supabase.storage.from('videos').remove([path]);
      setMessage(error.message);
    } else {
      setMessage('Video saved successfully.');
      setFile(null);
      setTitle('');
      setDate('');
      await loadVideos();
    }

    setLoading(false);
  }

  async function deleteVideo(video: VideoItem) {
    if (!confirm('Delete this video?')) return;

    if (video.storagePath) {
      await supabase.storage.from('videos').remove([video.storagePath]);
    }

    const { error } = await supabase.from('videos').delete().eq('id', video.id);

    if (error) setMessage(error.message);
    else await loadVideos();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Videos</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your video library</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <Upload className="text-cyan-400" /> Upload video
        </h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Video title"
          className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
        />

        <input
          type="file"
          accept="video/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-gray-300"
        />

        <label className="block text-sm text-gray-400">Schedule date (optional)</label>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
        />

        <button
          onClick={uploadVideo}
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 p-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload and save'}
        </button>

        {message && <p className="text-sm text-cyan-300">{message}</p>}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Your library ({videos.length})
        </h2>

        {videos.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <FileVideo className="mx-auto mb-3 text-cyan-400" size={38} />
            <p className="text-gray-400">No videos uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {videos.map(video => (
              <div key={video.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                {video.videoUrl ? (
                  <video src={video.videoUrl} controls className="aspect-video w-full bg-black" />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-cyan-500/10">
                    <Play className="text-cyan-400" size={40} />
                  </div>
                )}

                <div className="space-y-3 p-4">
                  <h3 className="font-semibold text-white">{video.title}</h3>
                  <p className="text-xs text-cyan-300">{video.status}</p>
                  {video.scheduledFor && (
                    <p className="text-xs text-gray-400">
                      <Calendar className="mr-1 inline" size={14} />
                      {new Date(video.scheduledFor).toLocaleString()}
                    </p>
                  )}
                  <button
                    onClick={() => deleteVideo(video)}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
