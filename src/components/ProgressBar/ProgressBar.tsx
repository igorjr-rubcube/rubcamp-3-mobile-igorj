import {Container, ProgressBarSize} from './ProgressBar.styles';

type Props = {
  progress: number;
};

function ProgressBar({progress}: Props) {
  return (
    <Container>
      <ProgressBarSize progress={progress} />
    </Container>
  );
}

export default ProgressBar;
