import { workspace } from "vscode";
import { LanguageClient, ServerOptions } from "vscode-languageclient";
//import { TransportKind, LanguageClientOptions, VersionedTextDocumentIdentifier } from "vscode-languageclient/lib/client";
import { LanguageClientOptions } from "vscode-languageclient/lib/client";
import { window } from 'vscode';
import * as path from 'path';
import *  as fs from 'fs';

export default class DafnyLanguageClient extends LanguageClient {

    constructor() {

        // 2do: Production Folder Structure may be different. Falls einfach zu machen fänd ich gut, wenn man den User nach der Exe fragt wenn nicht gefunden. Ticket #45
        const dafnyLangServerExe = path.join(__dirname, "../../../../dafny-language-server/Binaries/DafnyLanguageServer.exe");

        fs.exists(dafnyLangServerExe, (exist) => {
            if (!exist) {
                window.showErrorMessage("Server Executable not found: " + dafnyLangServerExe);
            }
        });

        const serverOptions: ServerOptions = {
            run: { command: dafnyLangServerExe, args: [] },
            debug: { command: dafnyLangServerExe, args: [] }
        }

        const clientOptions: LanguageClientOptions = {
            documentSelector: [
                {
                    pattern: '**/*.dfy',
                },
                {
                    language: "dafny",
                    scheme: "file",
                }
            ],
            synchronize: {
                fileEvents: workspace.createFileSystemWatcher('**/*.dfy'),
                configurationSection: "dafny",
            },
        }

        super("dafny-vscode", "Dafny Language Server", serverOptions, clientOptions);
    }
}
