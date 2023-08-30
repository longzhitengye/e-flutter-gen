// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { insertSnippet } from "./utils/insert_snippet";
import { SpaceX } from "./utils/space";
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