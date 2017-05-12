import * as React from "react";

interface State {
  file: File | undefined;
  result: string;
  apiKey: string;
  resultCount: number;
  mode: string;
}

export class VideoAPI extends React.Component<any, State> {

  constructor(props: any) {
    super(props)
    this.state = {file : undefined, result: '', apiKey: '', resultCount: 1, mode: 'LABEL_DETECTION'}
  }

  fileChange = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    if(target.files) {
      const file: File = target.files.item(0);
      this.setState({file})
    }
  }

  changeAPIKey = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({apiKey: target.value})
  }

  changeNum = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({resultCount: Number(target.value)})
  }

  analyze = async () => {
    console.log(this.state)
    const formData = new FormData();
    formData.append('myFile', this.state.file!);

    try {
      const response: Response = await fetch(`https://us-central1-uryyyyyyy-ai-executor.cloudfunctions.net/function-2`, {
        method: 'POST',
        body: formData
      });

      const json: any = await response.json();
      this.setState({result: JSON.stringify(json, null, 2)})
    } catch (err) {
      window.alert(err.message)
    }
  }

  changeMode = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({mode: target.value})
  }

  render() {
    return (
      <div>
        <h2>Google Video API</h2>
        <a href='https://cloud.google.com/video-intelligence/'>https://cloud.google.com/video-intelligence/</a>
        <div>
          <h3>ファイル選択</h3>
          <input type="file" name="myFile" onChange={this.fileChange}/>
        </div>
        <div>
          <h3>Google APIキー</h3>
          <input type="text" onChange={this.changeAPIKey} style={{width: 50}} value={this.state.apiKey}/>
        </div>
        <div>
          <button onClick={this.analyze} >アップロードして解析</button>
        </div>
        <div>
          <h3>結果</h3>
          <textarea style={{width: 500, height: 200}} value={this.state.result}/>
        </div>
      </div>
    )
  }
}