import * as React from "react";

interface State {
  description: string;
  result: string;
  apiKey: string;
  style: string;
}

export class TextSuggest extends React.Component<any, State> {

  constructor(props: any) {
    super(props)
    this.state = {description : '', result: '', apiKey: '', style: '0'}
  }

  changeDescription = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({description: target.value})
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
      const response: Response = await fetch(`
      https://api.a3rt.recruit-tech.co.jp/text_suggest/v1/predict?apikey=${this.state.apiKey}&previous_description=${this.state.description}&style=${this.state.style}
      `, {
        method: 'GET',
        headers: myHeaders
      });

      const json: any = await response.json();
      this.setState({result: JSON.stringify(json, null, 2)})
    } catch (err) {
      window.alert(err.message)
    }
  }

  changeStyle = (e: any) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    this.setState({style: target.value})
  }

  render() {
    return (
      <div>
        <h2>TextSuggest API</h2>
        <a href='https://a3rt.recruit-tech.co.jp/product/textSuggestAPI/'>https://a3rt.recruit-tech.co.jp/product/textSuggestAPI/</a>
        <div>
          <h3>入力文（日本語）</h3>
          <input type="text" onChange={this.changeDescription} style={{width: 300}} value={this.state.description}/>
        </div>
        <div>
          <h3>スタイル</h3>
          <select value={this.state.style} onChange={this.changeStyle} >
            {[{label: '現代文', value: '0'}, {label: '和歌', value: '1'}, {label: 'プログラミング言語(Go)', value: '2'}].map(v => <option value={v.value} key={v.value}>{v.label}</option>)}
          </select>
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