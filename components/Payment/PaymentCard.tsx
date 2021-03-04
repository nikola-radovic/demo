import React, { Component } from 'react';
import { Typography } from '../../../../themes/default/Typography';
import { DemoWrapper } from '../../../../components/DemoPanel';
import { Paper } from '../../../../themes/default/Paper';
import PaymentCardDemo from './PaymentCardDemo';
import { PaymentCardService } from '../../services/PaymentCard';

/**
 * @interface
 */
interface PaymentCardSectionProps {
    children?: React.ReactNode;
}

/**
 * @class ./scenes/DataDisplay/components/PaymentCard/PaymentCard
 */
class PaymentCardSection extends Component<PaymentCardSectionProps>
{
    /**
     * @type {Object}
     */
    private paymentCardService!: PaymentCardService;

    /**
     * @override
     */
    constructor(props: PaymentCardSectionProps)
    {
        super(props);

        this.paymentCardService = new PaymentCardService();
    }

    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        return (
            <Paper classes={['mb-4']}>
                <Typography variant="body-medium-16" classes={['mb-2', 'text-primary']}>PaymentCard</Typography>
                <Typography variant="body-regular-16" classes={['mb-4']}>
                    PaymentCard is a surface component used to display payment icon.
                </Typography>
                <DemoWrapper
                    identifier="code-payment-card"
                    description={this.paymentCardService.getCode()}
                    payload={this.paymentCardService.getApi()}
                    classes={['th-type__50pct']}
                >
                    <PaymentCardDemo />
                </DemoWrapper>
            </Paper>
        );
    }
}

export default PaymentCardSection;