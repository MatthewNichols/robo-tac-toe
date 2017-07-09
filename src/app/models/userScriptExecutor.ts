export class userScriptExecutor {

  /**
   * Class for executing user scripts in the game context
   * @param {string} userScriptText Script to execute
   * @param {string} sourceUrl the virtual file name to assign to the script in the browser dev tools.
   */
  constructor(private userScriptText: string, private sourceUrl: string) {}

  /**
   * Executes the script
   * @param {scriptingAPI} api that the executing script uses to interact with the game.
   * A Linter might think it is unused due to the script running in eval, but it is not.
   */
  execute(api: any) {
    const scriptFunction = `${this.userScriptText}
          //# sourceURL=player${this.sourceUrl}`;
    eval(scriptFunction);
  }
}
