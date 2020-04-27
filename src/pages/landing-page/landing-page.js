import '@layout/app-base/app-base'
import '@layout/header/header'
import '@layout/search-card/search-card'
import SearchCard from '@layout/search-card/search-card'
import '@layout/footer/footer'

import '@components/text/text'

import './landing-page.scss'
import '@/main.scss'

const searchCard = $('.js-landing-page__search-card')[0]
new SearchCard(searchCard)
