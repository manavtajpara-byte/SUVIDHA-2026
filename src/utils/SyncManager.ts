export interface QueuedRequest {
    id: string;
    url: string;
    method: string;
    body: any;
    timestamp: number;
    status: 'pending' | 'synced' | 'failed';
}

class SyncManagerClass {
    private queueKey = 'suvidha_offline_queue';

    public getQueue(): QueuedRequest[] {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem(this.queueKey);
        return saved ? JSON.parse(saved) : [];
    }

    public addToQueue(request: Omit<QueuedRequest, 'id' | 'timestamp' | 'status'>) {
        const queue = this.getQueue();
        const newReq: QueuedRequest = {
            ...request,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            status: 'pending'
        };
        queue.push(newReq);
        this.saveQueue(queue);
        return newReq.id;
    }

    private saveQueue(queue: QueuedRequest[]) {
        localStorage.setItem(this.queueKey, JSON.stringify(queue));
    }

    public async syncWithServer() {
        if (typeof window === 'undefined' || !navigator.onLine) return;

        const queue = this.getQueue();
        const pending = queue.filter(q => q.status === 'pending');

        if (pending.length === 0) return;


        // Mock Sync Process
        const updatedQueue = queue.map(q => {
            if (q.status === 'pending') {
                // Simulate success
                return { ...q, status: 'synced' as const };
            }
            return q;
        });

        this.saveQueue(updatedQueue);
        // Clean up synced items after 5 seconds? Or keep log?
        // For now, keep them to show in UI
    }

    public clearSynced() {
        const queue = this.getQueue();
        const active = queue.filter(q => q.status !== 'synced');
        this.saveQueue(active);
    }
}

export const SyncManager = new SyncManagerClass();
