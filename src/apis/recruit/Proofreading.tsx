import * as React from "react";

interface State {
  sentence: string;
  result: string;
  apiKey: string;
}

export class Proofreading extends React.Component<any, State> {

  constructor(props: any) {
    super(props)
    this.state = {sentence : '', result: '', apiKey: ''}
  }

  changeContent = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({sentence: target.value})
  }

  changeAPIKey = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({apiKey: target.value})
  }

  analyze = async () => {
    console.log(this.state)
    const myHeaders = new Headers({
      'Accept': 'application/json'
    });

    try {
      const response: Response = await fetch(`https://api.a3rt.recruit-tech.co.jp/proofreading/v1/typo?apikey=${this.state.apiKey}&sentence=${this.state.sentence}`, {
        method: 'GET',
        headers: myHeaders
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
        <h2>Proofreading API</h2>
        <a href='https://a3rt.recruit-tech.co.jp/product/proofreadingAPI/'>https://a3rt.recruit-tech.co.jp/product/proofreadingAPI/</a>
        <div>
          <h3>チェックしたい文言（日本語. 500字まで）</h3>
          <input type="text" onChange={this.changeContent} style={{width: 300}} value={this.state.sentence}/>
        </div>
        <div>
          <h3>Recruit APIキー</h3>
          <input type="text" onChange={this.changeAPIKey} style={{width: 50}} value={this.state.apiKey}/>
        </div>
        <div>
          <button onClick={this.analyze} >解析</button>
        </div>
        <div>
          <h3>結果</h3>
          <textarea style={{width: 500, height: 200}} value={this.state.result}/>
        </div>
      </div>
    )
  }
}