import { Box, Progress, PasswordInput, Group, Text, Center } from '@mantine/core';
import { FaCheck } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string; }) {
    return (
        <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <FaCheck size={14} /> : <RxCross1 size={14} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Contient au moins un chiffre' },
    { re: /[a-z]/, label: 'Contient au moins une minuscule' },
    { re: /[A-Z]/, label: 'Contient au moins une majuscule' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Contient au moins contenir un caractère spécial' },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface PasswordCheckerProps {
    value: string;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    disabled: boolean;

    name: string;
}

export function PasswordChecker(props: PasswordCheckerProps) {
    // const [value, setValue] = useInputState('');
    const strength = getStrength(props.value);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(props.value)} />
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: '0ms' } }}
                value={
                    props.value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
            />
        ));

    return (
        <div>
            <PasswordInput
                value={props.value}
                onChange={(e) => { props.onChange(e); }}
                placeholder="Votre mot de passe"
                label="Mot de passe" size='md' mt={'md'} disabled={props.disabled} name={props.name}
            />
            {
                props?.value?.length >= 1
                    ?
                    <>
                        <Group spacing={5} grow mt="xs" mb="md">
                            {bars}
                        </Group>

                        <PasswordRequirement label="Contient au moins 6 caractères" meets={props.value.length > 5} />
                        {checks}
                    </>
                    :
                    <></>
            }
        </div>
    );
}