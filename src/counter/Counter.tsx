import * as React from "react";

interface State {
  fileBase64: string | undefined;
  result: string;
  apiKey: string;
  resultCount: number;
}

export class Counter extends React.Component<any, State> {

  constructor(props: any) {
    super(props)
    this.state = {fileBase64 : undefined, result: '', apiKey: '', resultCount: 1}
  }

  fileChange = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    if(target.files) {
      const file: File = target.files.item(0)
      const fr = new FileReader()
      fr.onload = (evt: any) => {
        this.setState({fileBase64: evt.target.result})
      }
      fr.readAsDataURL(file);
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
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      'Accept': 'application/json',
    });

    const index = this.state.fileBase64!.indexOf(',');
    const base64Only = this.state.fileBase64!.slice(index + 1)
    console.log(base64Only)

    const requestJSON = `
    {
  "requests": [
    {
      "image": {
        "content": "${base64Only}"
      },
      "features": [
        {
          "type": "LABEL_DETECTION",
          "maxResults": ${this.state.resultCount}
        }
      ]
    }
  ]
}
    `

    try {
      const response: Response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${this.state.apiKey}`, {
        method: 'POST',
        headers: myHeaders,
        body: requestJSON
      });

      const json: any = await response.json();
      this.setState({result: JSON.stringify(json, null, 2)})
    } catch (err) {
      window.alert(err.message)
    }
  }

  render() {
    return (
      <div>
        <h2>Google Vision API (LABEL DETECTION)</h2>
        <div>
          <h3>ファイル選択</h3>
          <input type="file" name="myFile" onChange={this.fileChange}/>
        </div>
        <div>
          <h3>ファイル確認</h3>
          {(this.state.fileBase64 === undefined) ? null : <img src={this.state.fileBase64} />}
        </div>
        <div>
          <h3>取得する件数</h3>
          <input type="number" step="1" value={this.state.resultCount} onChange={this.changeNum}/>
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