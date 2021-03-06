/// <reference types="node" />
/// <reference types="ot-json0" />

import * as http from "http";
import * as stream from "stream";
import * as ot from "ot-json0"
import {Connection} from "./client";


declare class Backend {

    constructor(options: Backend.Options);

    close(callback: (err: Backend.ShareDbError) => void);
    connect(connection?: Connection, req?: http.IncomingMessage);
    listen(stream: stream.Duplex);

    use(action: 'connect', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'op', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'doc', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'query', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'submit', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'apply', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'commit', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'after submit', fn: (req: Backend.Request, callback: () => void) => void);
    use(action: 'receive', fn: (req: Backend.Request, callback: () => void) => void);
}

declare namespace Backend {

    interface DbAdapter {

    }

    interface PubSubAdapter {

    }

    class Request {
        action?: any;
        agent?: Agent;
        req?: http.IncomingMessage;
        collection?: string;
        id?: string;
        query?: any;
        op?: ot.operation;
    }

    class Options {
        db: DbAdapter;
        pubsub?: PubSubAdapter;
    }

    class ShareDbError implements Error {
        name: string;
        code: number;
        message: string;
        stack?: string;
    }

    class Agent {
        constructor(backend: Backend, connection: Connection);

        stream: stream.Duplex;
    }
}

export = Backend;