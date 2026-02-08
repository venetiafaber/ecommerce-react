import { Header } from '../components/Header';
import './NotFound.css';

export function NotFound({ cart }) {
  return(
    <>
      <Header cart={cart}/>

      <div className='not-found-page'>
        <div className='page-title'>Sorry, the page that you are looking for, does not exist.

        </div>
      </div>
    </>
  );
}