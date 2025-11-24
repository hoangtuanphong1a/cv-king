import currencyFormatter from 'currency-formatter';

interface CurrencyFormattedProps {
  value: number | undefined;
  code: string;
}

const CurrencyFormatted = ({ value, code }: CurrencyFormattedProps) => {
  return currencyFormatter.format(value!, { code: code });
};

export default CurrencyFormatted;
