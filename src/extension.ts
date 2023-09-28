// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { insertSnippet } from "./utils/insert_snippet";
import { SpaceX } from "./utils/space";
import * as cp from 'child_process';
import * as path from 'path';

function replaceFileNameWithWildcard(filePath: string): string {
	const dirName = path.dirname(filePath);
	return path.join(dirName, '*') + path.extname(filePath);
}
function splitPathByLib(fullPath: string): [string, string] {
	const parts = fullPath.split('\\lib\\');
	if (parts.length !== 2) {
		throw new Error("Invalid path format");
	}
	return [parts[0], 'lib\\' + parts[1]];
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed




export function activate(context: vscode.ExtensionContext) {

	vscode.window.showInformationMessage('FutureBuilder active!');

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ language: 'dart', scheme: 'file' },
			new DartQuickFixProvider()
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('e-flutter-gen.futurebuilder', () => {
			insertSnippet(
				"FutureBuilder<${1}>(\n" + SpaceX() + "future: _fetch(),\n" + SpaceX() + "builder: (context, snapshot) {\n" + SpaceX() + SpaceX() + "if (snapshot.hasData) {\n" + SpaceX() + SpaceX() + "return ",
				";\n} else if (snapshot.hasError) {\n return Text('${snapshot.error}');\n}\nreturn const CircularProgressIndicator();\n},\n)",
				SpaceX(),
				false);
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('e-flutter-gen.scaffold', () => {
			insertSnippet(
				"Scaffold( \n body: ",
				",)",
				SpaceX(),
				false);
		})
	);


	context.subscriptions.push(
		vscode.commands.registerCommand('e-flutter-gen.dartggen', function (fileUri) {
			// 获取文件路径
			const filePath = fileUri.fsPath;
			var newFilename = replaceFileNameWithWildcard(filePath);

			const [workingDirectory, dartFile] = splitPathByLib(newFilename);
			console.log('Gen .g.dart -> ' + newFilename);
			console.log('workingDirectory -> ' + workingDirectory);
			console.log('dartFile -> ' + dartFile);

			const terminal = vscode.window.createTerminal('Dart Build Runner');
			const cmd = `dart run build_runner build --build-filter '${dartFile}'`;

			// 执行您的命令
			terminal.sendText(cmd);
			terminal.show();

			// vscode.window.onDidChangeTerminalState((e) => {
			// 	console.log('onDidChangeTerminalState -> ' + terminal.state.isInteractedWith);
			// });
			setTimeout(() => {
				terminal.dispose();
			}, 30000);
			// 设置终端关闭的监听器
			// vscode.window.onDidCloseTerminal(closedTerminal => {
			// 	if (closedTerminal === terminal) {
			// 		// 在这里，您可以检查终端的最后一个输出来确定是否需要关闭终端
			// 		// 您可能需要使用其他方法来捕获和检查终端的最后一个输出
			// 		// 如果最后一个输出包含 "BUILD_COMPLETED"，则可以关闭终端
			// 		terminal.dispose();
			// 	}
			// });


			// console.log(process.env);
			// cp.exec(cmd, { cwd: workingDirectory }, (error, stdout, stderr) => {
			// 	if (error) {
			// 		console.log(`Error executing command: ${error.message}`);
			// 		return;
			// 	}
			// 	if (stderr) {
			// 		console.log(`Error: ${stderr}`);
			// 		return;
			// 	}
			// 	console.log(`Command executed successfully: ${stdout}`);
			// 	vscode.window.showInformationMessage(`Command executed successfully: ${stdout}`);
			// });
		}));



}

// This method is called when your extension is deactivated
export function deactivate() { }

class DartQuickFixProvider implements vscode.CodeActionProvider {
	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]>;
	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.Command)[]>;
	provideCodeActions(document: unknown, range: unknown, context: unknown, token: unknown): (vscode.CodeAction | vscode.Command)[] | Thenable<(vscode.CodeAction | vscode.Command)[] | null | undefined> | (vscode.Command)[] | Thenable<(vscode.Command)[] | null | undefined> | null | undefined {

		const editorX = vscode.window.activeTextEditor;
		if (!editorX) {
			return [];
		}
		const codeActions = [];

		var verText = editorX.document.getText(editorX.selection).length;

		codeActions.push({
			command: "e-flutter-gen.futurebuilder",
			title: "Wrap with FutureBuilder"
		});
		codeActions.push({
			command: "e-flutter-gen.scaffold",
			title: "Wrap with Scaffold"
		});
		return codeActions;
	}
}

// const quickFixFutureBuilder = new vscode.CodeAction('Wrap with FutureBuilder', vscode.CodeActionKind.QuickFix);
// quickFixFutureBuilder.command = {
// 	command: 'e-flutter-gen.futurebuilder',// 上面的 [命令名]
// 	title: 'FutureBuilderTitle',
// };

// return [quickFixFutureBuilder];