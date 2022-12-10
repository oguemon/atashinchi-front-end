import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion,
} from './EpisodeComplement'

type Props = {
  setQuery: Dispatch<SetStateAction<string>>
  episode_names: string[]
}

const Content: FC<Props> = ({ setQuery, episode_names }) => {
  // サジェスト一覧
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  // 入力フォームのRef
  const inputQuery = useRef(null)

  // サジェストを呼び出す時に実行される関数
  const onSuggestionsFetchRequested: Autosuggest.SuggestionsFetchRequested = (
    value,
  ) => {
    // サジェスト結果であるstring[]をsetStateする
    setSuggestions(getSuggestions(episode_names, value))
  }

  // サジェストをクリアする時に実行される関数
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  // サジェストを選択した時に実行される関数
  const onSuggestionSelected: Autosuggest.OnSuggestionSelected<string> = (
    _,
    data,
  ) => {
    // サジェスト文で検索する
    sendQuery(data.suggestionValue)
  }

  // オートコンプリメント対象のinput要素
  const inputProps: Autosuggest.InputProps<string> = {
    className: 'input-query',
    onChange: (event, { newValue }) => {
      setInputValue(newValue)
    },
    onKeyDown: (e) => {
      // エンターキーが押されると検索する
      if (e.key === 'Enter') {
        // 設定されているクエリで検索する
        sendQuery(inputValue)
      }
    },
    placeholder: 'エピソード名を入力',
    ref: inputQuery,
    title: '検索',
    type: 'search',
    value: inputValue,
  }

  // 検索ボタンがクリックされた時に実行される関数
  const onClickButton = () => {
    // 設定されているクエリで検索する
    sendQuery(inputValue)
  }

  // クエリを送信
  const sendQuery = (query: string) => {
    // 空文字じゃない時のみ検索
    if (query !== '') {
      setInputValue(query)
      setQuery(query)
    }
  }

  return (
    <div className='form-box'>
      <div className='wrapper'>
        <div className='input-wrapper'>
          {/* iPhoneで「検索」ボタンを出すためのformタグ(submitを防ぐためにreturn falseを加えた) */}
          <form
            action=''
            onSubmit={() => {
              return false
            }}
          >
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              focusInputOnSuggestionClick={false}
              inputProps={inputProps}
            />
          </form>
          <button className='submit-btn' onClick={onClickButton}></button>
        </div>
      </div>
    </div>
  )
}

export const SearchForm = memo(Content)
