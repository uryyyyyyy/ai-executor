import * as React from "react";

interface State {
  content: string;
  result: string;
  apiKey: string;
}

export class RecruitProofreading extends React.Component<any, State> {

  constructor(props: any) {
    super(props)
    this.state = {content : '', result: '', apiKey: ''}
  }

  changeContent = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({content: target.value})
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
      const response: Response = await fetch(`https://api.a3rt.recruit-tech.co.jp/proofreading/v1/typo?apikey=${this.state.apiKey}&sentence=${this.state.content}`, {
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
        <h2>Recruit Proofreading</h2>
        <div>
          <h3>チェックしたい文言（日本語. 500字まで）</h3>
          <input type="text" onChange={this.changeContent} style={{width: 300}} value={this.state.content}/>
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