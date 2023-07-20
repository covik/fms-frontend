import { MapAddressSearch } from './address-search';
import { Coordinates } from '../../../lib/dimension';
import type { SearchHandler, SearchImplementationAttributes } from './types';

it('should not trigger onCoordinateChange given non-address or coordinates input', () => {
  testSearch('junk-input').listenerShouldNotHaveBeenCalled();
});

it('should trigger onCoordinateChange given address successfully resolved coordinates', () => {
  const value = new Coordinates(45.1, 15.2);
  testSearch(value).listenerShouldHaveBeenCalledWith(value);
});

it('should not trigger onCoordinateChange given invalid text coordinates', () => {
  testSearch('45, 15, 16').listenerShouldNotHaveBeenCalled();
  testSearch('aaa45, 15bbb').listenerShouldNotHaveBeenCalled();
});

it('should not trigger onCoordinateChange given text coordinates not in correct range', () => {
  testSearch('-2000, 10').listenerShouldNotHaveBeenCalled();
  testSearch('2000, 10').listenerShouldNotHaveBeenCalled();
  testSearch('10, 2000').listenerShouldNotHaveBeenCalled();
  testSearch('10, -2000').listenerShouldNotHaveBeenCalled();
});

describe('should trigger onCoordinateChange given text coordinates', () => {
  specify('format "latitude, longitude" with decimals', () => {
    testSearch('-46.1,  -12.3').listenerShouldHaveBeenCalledWith(
      new Coordinates(-46.1, -12.3),
    );
  });
  specify('format "latitude, longitude" without decimals', () => {
    testSearch('46, 12').listenerShouldHaveBeenCalledWith(
      new Coordinates(46, 12),
    );
  });

  specify('format "latitude,longitude" with decimals', () => {
    testSearch('46.1,12.3').listenerShouldHaveBeenCalledWith(
      new Coordinates(46.1, 12.3),
    );
  });
  specify('format "latitude,longitude without decimals', () => {
    testSearch('46,12').listenerShouldHaveBeenCalledWith(
      new Coordinates(46, 12),
    );
  });

  specify('format "latitude longitude" with decimals', () => {
    testSearch('-46.1  -12.3').listenerShouldHaveBeenCalledWith(
      new Coordinates(-46.1, -12.3),
    );
  });
  specify('format "latitude longitude" without decimals', () => {
    testSearch('-46  -12').listenerShouldHaveBeenCalledWith(
      new Coordinates(-46, -12),
    );
  });
});

type Input = Parameters<SearchHandler>[0];

function stubAutocomplete(value: Input) {
  return function AutocompleteStub(props: SearchImplementationAttributes) {
    props.onPlaceChanged(value);

    return null;
  };
}

function testSearch(input: Input) {
  const coordinatesChange = cy.stub().as('coordinates-change');
  const autocomplete = stubAutocomplete(input);
  cy.mount(
    <MapAddressSearch
      onCoordinateChange={coordinatesChange}
      Autocomplete={autocomplete}
    />,
  );

  return {
    listenerShouldNotHaveBeenCalled() {
      cy.get('@coordinates-change').should('not.have.been.called');
    },
    listenerShouldHaveBeenCalledWith(output: Coordinates) {
      cy.get('@coordinates-change').should(
        'have.been.calledOnceWithExactly',
        output,
      );
    },
  };
}
