import * as sharedb from "sharedb";

declare namespace Client {

    class Doc<T> {
        connection: Connection;
        collection: string;
        id: string;
        version: number;
        subscribed: boolean;
        data: T;

        fetch(callback: (err: sharedb.ShareDbError) => void);
        subscribe(callback: (err: sharedb.ShareDbError) => void);
        destroy();

        on(event: 'load', callback?: () => void);
        on(event: 'create', callback?: (source: boolean) => void);
        on(event: 'before op', callback?: (op: any, source: boolean) => void);
        on(event: 'op', callback?: (op: any, source: boolean) => void);
        on(event: 'del', callback?: (data: T, source: boolean) => void);
        on(event: 'error', callback?: (error: sharedb.ShareDbError) => void);

        removeListener(event: string, callback?: (arg1?: any, arg2?: any) => void);
        create(data: T, type?: string, options?: Client.Doc.Options, callback?: (err: sharedb.ShareDbError) => void);
        submitOp(op: any, options?: Client.Doc.Options, callback?: (err: sharedb.ShareDbError) => void);
        del(options?: Client.Doc.Options, callback?: (err: sharedb.ShareDbError) => void);
        whenNothingPending(callback?: (err: sharedb.ShareDbError) => void);
    }

    namespace Doc {
        interface Options {
            source: any;
        }
    }

    class Connection {
        constructor(socket: WebSocket);

        get<T>(collectionName: string, id: string): Doc<T>;
        createFetchQuery<T>(collectionName: string, query: any, options: Client.Connection.Options<T>, callback: (err: sharedb.ShareDbError, results: Doc<T>[]) => void);
        createSubscribeQuery<T>(collectionName: string, query: any, options: Client.Connection.Options<T>, callback: (rr: sharedb.ShareDbError, results: Doc<T>[]) => void): Query<T>;
    }

    namespace Connection {
        interface Options<T> {
            results: T[];
        }
    }

    class Query<T> {
        ready: boolean;
        results: Doc<T>[];
        extra: any;

        destroy();
        on(event: 'ready', callback: () => void);
        on(event: 'error', callback: (err: sharedb.ShareDbError) => void);
        on(event: 'changed', callback: (results: Doc<T>[]) => void);
        on(event: 'insert', callback: (docs: Doc<T>[], atIndex: number) => void);
        on(event: 'move', callback: (docs: Doc<T>, from: number, to: number) => void);
        on(event: 'remove', callback: (docs: Doc<T>[], atIndex: number) => void);
        on(event: 'extra', callback: () => void);
    }
}

export = Client;