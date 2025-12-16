import { DISTANCE_UNITS } from '../core/Constants.js';

// UnitConverter handles distance unit conversions
export class UnitConverter {
    // Convert distance in km to specified unit
    static convert(distanceKm, targetUnit) {
        if (!targetUnit || !targetUnit.kmConversion) {
            console.warn('Invalid target unit, using AU');
            targetUnit = DISTANCE_UNITS.AU;
        }

        return distanceKm / targetUnit.kmConversion;
    }

    // Format distance with unit
    static format(distanceKm, unit) {
        const value = this.convert(distanceKm, unit);
        return `${value.toFixed(2)} ${unit.abbreviation}`;
    }

    // Get unit by name
    static getUnit(unitName) {
        return DISTANCE_UNITS[unitName] || DISTANCE_UNITS.AU;
    }
}
